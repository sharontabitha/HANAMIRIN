import { useState } from 'react';
import { Check, Pencil, Plus, Trash2, X } from 'lucide-react';

const emptyWord = { hanzi: '', pinyin: '', meaning: '', level: 1 };

export default function NotebookCRUD({ words, onCreate, onUpdate, onDelete }) {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState('');
  const [draft, setDraft] = useState(emptyWord);

  function startEdit(word) {
    setEditing(word.hanzi);
    setDraft({ ...word });
  }

  function saveNew(event) {
    event.preventDefault();
    if (!draft.hanzi.trim() || !draft.pinyin.trim() || !draft.meaning.trim()) return;
    onCreate({ ...draft, hanzi: draft.hanzi.trim(), pinyin: draft.pinyin.trim(), meaning: draft.meaning.trim(), topic: 'MY WORDS', lesson: 'Personal notebook' });
    setDraft(emptyWord);
    setAdding(false);
  }

  function saveEdit(event, word) {
    event.preventDefault();
    if (!draft.hanzi.trim() || !draft.pinyin.trim() || !draft.meaning.trim()) return;
    onUpdate(word, { ...draft, hanzi: draft.hanzi.trim(), pinyin: draft.pinyin.trim(), meaning: draft.meaning.trim() });
    setEditing('');
  }

  function fields(prefix) {
    return <div className="notebook-edit-fields">
      <label><span>HANZI</span><input required value={draft.hanzi} onChange={event => setDraft(value => ({ ...value, hanzi: event.target.value }))} placeholder="你好" /></label>
      <label><span>PINYIN</span><input required value={draft.pinyin} onChange={event => setDraft(value => ({ ...value, pinyin: event.target.value }))} placeholder="nǐ hǎo" /></label>
      <label><span>MEANING</span><input required value={draft.meaning} onChange={event => setDraft(value => ({ ...value, meaning: event.target.value }))} placeholder="hello" /></label>
      {prefix === 'new' && <label><span>LEVEL</span><select value={draft.level} onChange={event => setDraft(value => ({ ...value, level: Number(event.target.value) }))}>{[1, 2, 3].map(level => <option key={level} value={level}>HSK {level}</option>)}</select></label>}
    </div>;
  }

  return <>
    <div className="notebook-manage-head"><span>{words.length} SAVED WORDS · ADD, EDIT OR REMOVE</span><button className="outline-button" onClick={() => { setAdding(value => !value); setDraft(emptyWord); }}><Plus size={15} /> Add a word</button></div>
    {adding && <form className="notebook-edit-form" onSubmit={saveNew}><b>Add a vocabulary word</b>{fields('new')}<div className="notebook-form-actions"><button className="primary-button" type="submit"><Check size={15} /> Add to notebook</button><button className="notebook-cancel" type="button" onClick={() => setAdding(false)}><X size={15} /> Cancel</button></div></form>}
    <div className="word-grid">{words.map(word => <article className="word-card notebook-word-card" key={word.hanzi}>
      {editing === word.hanzi ? <form onSubmit={event => saveEdit(event, word)}><b className="notebook-edit-title">Edit vocabulary</b>{fields('edit')}<div className="notebook-form-actions"><button className="primary-button" type="submit"><Check size={15} /> Save changes</button><button className="notebook-cancel" type="button" onClick={() => setEditing('')}><X size={15} /> Cancel</button></div></form> : <>
        <div className="word-card-top"><div><span className="word-hanzi">{word.hanzi}</span><span className="word-pinyin">{word.pinyin}</span></div><div className="notebook-card-actions"><button className="notebook-action edit" title={`Edit ${word.hanzi}`} onClick={() => startEdit(word)}><Pencil size={14} /></button><button className="notebook-action delete" title={`Delete ${word.hanzi}`} onClick={() => onDelete(word)}><Trash2 size={14} /></button></div></div>
        <div className="word-meaning">{word.meaning}</div><div className="word-card-foot"><span>HSK {word.level}</span><span>{word.topic}</span></div>
      </>}
    </article>)}</div>
  </>;
}
