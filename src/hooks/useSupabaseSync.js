import { useEffect, useRef, useState } from 'react';
import { supabase } from '../lib/supabase.js';

export function useSupabaseSync({ profile, stars, done, setProfile, setStars, setDone }) {
  const [userId, setUserId] = useState(null);
  const [status, setStatus] = useState(supabase ? 'Connecting to Supabase…' : 'Saved on this device');
  const [ready, setReady] = useState(!supabase);
  const readyRef = useRef(!supabase);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    async function connect() {
      try {
        let { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (!session) {
          const result = await supabase.auth.signInAnonymously();
          if (result.error) throw result.error;
          session = result.data.session;
        }
        const id = session?.user?.id;
        if (!id) throw new Error('Supabase did not return a learner session.');
        const { data, error: loadError } = await supabase
          .from('hanami_user_state').select('profile, stars, done').eq('user_id', id).maybeSingle();
        if (loadError) throw loadError;
        if (!active) return;
        setUserId(id);
        if (data) {
          if (data.profile) setProfile(data.profile);
          if (Array.isArray(data.stars)) setStars(data.stars);
          if (Array.isArray(data.done)) setDone(data.done);
        }
        readyRef.current = true;
        setReady(true);
        setStatus('Synced with Supabase');
      } catch (error) {
        if (!active) return;
        readyRef.current = true;
        setReady(true);
        setStatus(error.message?.includes('anonymous') ? 'Device save · enable anonymous sign-in to sync' : 'Device save · Supabase setup needed');
      }
    }
    connect();
    return () => { active = false; };
  }, [setProfile, setStars, setDone]);

  useEffect(() => {
    localStorage.setItem('hanami-profile', JSON.stringify(profile));
    localStorage.setItem('hanami-stars', JSON.stringify(stars));
    localStorage.setItem('hanami-done', JSON.stringify(done));
    if (!supabase || !userId || !ready || !readyRef.current) return;
    const timer = window.setTimeout(async () => {
      const { error } = await supabase.from('hanami_user_state').upsert({
        user_id: userId, profile, stars, done, updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' });
      if (error) setStatus('Device save · cloud sync paused');
      else setStatus('Synced with Supabase');
    }, 500);
    return () => window.clearTimeout(timer);
  }, [profile, stars, done, userId, ready]);

  async function savePhoto(file) {
    if (!file || !file.type.startsWith('image/')) throw new Error('Choose an image file.');
    if (file.size > 2 * 1024 * 1024) throw new Error('Choose an image under 2 MB.');
    if (supabase && userId) {
      const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
      const path = `${userId}/${Date.now()}-${safeName}`;
      const { error } = await supabase.storage.from('profile-photos').upload(path, file, {
        upsert: true, contentType: file.type, cacheControl: '3600'
      });
      if (error) throw error;
      return supabase.storage.from('profile-photos').getPublicUrl(path).data.publicUrl;
    }
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Could not read that image.'));
      reader.readAsDataURL(file);
    });
  }

  return { status, savePhoto };
}
