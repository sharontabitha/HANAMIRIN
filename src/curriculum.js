import { lessons as starterLessons } from './data.js';

// Chapter order and Chinese lesson titles follow the three supplied textbooks.
const chapters = [
  [1,'你好','nǐ hǎo','Hello','Greetings, names & polite introductions','你好','hello'],
  [1,'谢谢你','xièxie nǐ','Thank You','Gratitude and polite replies','谢谢','thank you'],
  [1,'你叫什么名字','nǐ jiào shénme míngzi','What Is Your Name?','Names and asking simple questions','名字','name'],
  [1,'她是我的汉语老师','tā shì wǒ de Hànyǔ lǎoshī','She Is My Chinese Teacher','People, jobs and 的 for belonging','老师','teacher'],
  [1,'她女儿今年二十岁','tā nǚ’ér jīnnián èrshí suì','Her Daughter Is Twenty This Year','Family, age and numbers','女儿','daughter'],
  [1,'我会说汉语','wǒ huì shuō Hànyǔ','I Can Speak Chinese','Languages and 会 for ability','说','to speak'],
  [1,'今天几号','jīntiān jǐ hào','What Is the Date Today?','Dates, days and asking when','今天','today'],
  [1,'我想喝茶','wǒ xiǎng hē chá','I’d Like to Drink Tea','Food, drinks and polite wants','茶','tea'],
  [1,'你儿子在哪儿工作','nǐ érzi zài nǎr gōngzuò','Where Does Your Son Work?','Places, work and 在 for location','工作','to work'],
  [1,'我能坐这儿吗','wǒ néng zuò zhèr ma','May I Sit Here?','Permission, places and 能','坐','to sit'],
  [1,'现在几点','xiànzài jǐ diǎn','What Time Is It?','Clock time and daily plans','现在','now'],
  [1,'明天天气怎么样','míngtiān tiānqì zěnmeyàng','How Will the Weather Be Tomorrow?','Weather and asking how things are','天气','weather'],
  [1,'他在学做中国菜呢','tā zài xué zuò Zhōngguó cài ne','He’s Learning to Cook Chinese Food','Activities in progress with 在…呢','做','to make · do'],
  [1,'她买了不少衣服','tā mǎi le bù shǎo yīfu','She Bought Quite a Lot of Clothes','Shopping, quantities and completed actions','衣服','clothes'],
  [1,'我是坐飞机来的','wǒ shì zuò fēijī lái de','I Came by Plane','Travel and explaining how you arrived','飞机','airplane'],
  [2,'九月去北京旅游最好','jiǔ yuè qù Běijīng lǚyóu zuì hǎo','September Is the Best Time to Visit Beijing','Travel plans, seasons and superlatives','旅游','to travel'],
  [2,'我每天六点起床','wǒ měitiān liù diǎn qǐchuáng','I Get Up at Six Every Day','Daily routines and time expressions','起床','to get up'],
  [2,'左边那个红色的是我的','zuǒbian nàge hóngsè de shì wǒ de','The Red One on the Left Is Mine','Directions, colors and identifying things','左边','left side'],
  [2,'这个工作是他帮我介绍的','zhège gōngzuò shì tā bāng wǒ jièshào de','He Helped Introduce Me to This Job','Jobs, helping and the 是…的 pattern','介绍','to introduce'],
  [2,'就买这件吧','jiù mǎi zhè jiàn ba','Let’s Buy This One','Shopping, measure words and suggestions','买','to buy'],
  [2,'你怎么不吃了','nǐ zěnme bù chī le','Why Have You Stopped Eating?','Meals, reactions and the change marker 了','吃','to eat'],
  [2,'你家离公司远吗','nǐ jiā lí gōngsī yuǎn ma','Is Your Home Far from the Office?','Distance and comparing locations with 离','远','far'],
  [2,'让我想想再告诉你','ràng wǒ xiǎngxiang zài gàosu nǐ','Let Me Think and Tell You Later','Making plans and sequencing with 再','告诉','to tell'],
  [2,'题太多，我没做完','tí tài duō, wǒ méi zuò wán','There Were Too Many Questions; I Didn’t Finish','Study, quantity and result complements','做完','to finish'],
  [2,'别找了，手机在桌子上呢','bié zhǎo le, shǒujī zài zhuōzi shàng ne','Stop Looking; the Phone Is on the Table','Finding things, locations and 别','手机','mobile phone'],
  [2,'他比我大三岁','tā bǐ wǒ dà sān suì','He Is Three Years Older Than Me','Comparisons with 比','比','than · compared with'],
  [2,'你穿得太少了','nǐ chuān de tài shǎo le','You’re Wearing Too Little','Clothes and describing how an action is done','穿','to wear'],
  [2,'门开着呢','mén kāizhe ne','The Door Is Open','Describing a continuing state with 着','开','to be open'],
  [2,'你看过那个电影吗','nǐ kàn guo nàge diànyǐng ma','Have You Seen That Movie?','Experiences with 过','电影','movie'],
  [2,'新年就要到了','xīnnián jiù yào dào le','The New Year Is Almost Here','Upcoming events with 就要…了','新年','New Year'],
  [3,'周末你有什么打算','zhōumò nǐ yǒu shénme dǎsuàn','What Are Your Weekend Plans?','Making and discussing plans','打算','plan'],
  [3,'他什么时候回来','tā shénme shíhou huílai','When Is He Coming Back?','Time, schedules and direction complements','回来','to come back'],
  [3,'桌子上放着很多饮料','zhuōzi shàng fàngzhe hěn duō yǐnliào','There Are Lots of Drinks on the Table','Existence and location with 着','饮料','drinks'],
  [3,'她总是笑着跟客人说话','tā zǒngshì xiàozhe gēn kèrén shuōhuà','She Always Smiles When Talking to Guests','Manner, habits and 跟','客人','guest'],
  [3,'我最近越来越胖了','wǒ zuìjìn yuèláiyuè pàng le','I’ve Been Getting Fatter Lately','Change over time with 越来越','最近','recently'],
  [3,'怎么突然找不到了','zěnme tūrán zhǎo bu dào le','Why Can’t I Find It All of a Sudden?','Searching and potential complements','突然','suddenly'],
  [3,'我跟她都认识五年了','wǒ gēn tā dōu rènshi wǔ nián le','She and I Have Known Each Other for Five Years','Duration and 都','认识','to know · meet'],
  [3,'你去哪儿我就去哪儿','nǐ qù nǎr wǒ jiù qù nǎr','Wherever You Go, I’ll Go Too','Matching actions with 就','去哪儿','where to go'],
  [3,'她的汉语说得跟中国人一样好','tā de Hànyǔ shuō de gēn Zhōngguórén yíyàng hǎo','She Speaks Chinese as Well as a Chinese Person','Comparisons with 跟…一样 and 得','一样','the same · equally'],
  [3,'数学比历史难多了','shùxué bǐ lìshǐ nán duō le','Math Is Much Harder Than History','Emphasizing comparisons with 多了','难','difficult'],
  [3,'别忘了把空调关了','bié wàng le bǎ kōngtiáo guān le','Don’t Forget to Turn Off the Air Conditioning','Reminders and the 把 construction','空调','air conditioning'],
  [3,'把重要的东西放在我这儿吧','bǎ zhòngyào de dōngxi fàng zài wǒ zhèr ba','Put the Important Things Here with Me','Using 把 to talk about handling objects','重要','important'],
  [3,'我是走回来的','wǒ shì zǒu huílai de','I Walked Back','Explaining how something happened with 是…的','走','to walk'],
  [3,'你把水果拿过来','nǐ bǎ shuǐguǒ ná guòlai','Bring the Fruit Over Here','把 and directional complements','水果','fruit'],
  [3,'其他都没什么问题','qítā dōu méi shénme wèntí','Everything Else Is Fine','Summarizing and expressing no problem','问题','problem'],
  [3,'我现在累得下了班就想睡觉','wǒ xiànzài lèi de xià le bān jiù xiǎng shuìjiào','I’m So Tired I Want to Sleep Right After Work','Describing results with 得','睡觉','to sleep'],
  [3,'谁都有办法看好你的病','shéi dōu yǒu bànfǎ kànhǎo nǐ de bìng','Everyone Has a Way to Treat Your Illness','Indefinite pronouns, 都 and result complements','办法','way · solution'],
  [3,'我相信他们会同意的','wǒ xiāngxìn tāmen huì tóngyì de','I Believe They’ll Agree','Expressing belief and expected outcomes','相信','to believe'],
  [3,'你没看出来吗','nǐ méi kàn chūlai ma','Couldn’t You Tell?','Recognizing and result complements','出来','to notice · come out'],
  [3,'我被他影响了','wǒ bèi tā yǐngxiǎng le','I Was Influenced by Him','The 被 passive construction','影响','to influence'],
];

const pools = {
  1: [['我','wǒ','I · me'],['你','nǐ','you'],['他','tā','he · him'],['我们','wǒmen','we · us'],['喜欢','xǐhuan','to like'],['想','xiǎng','to want · would like'],['去','qù','to go'],['来','lái','to come'],['有','yǒu','to have'],['在','zài','at · in'],['看','kàn','to see · look'],['吃','chī','to eat'],['喝','hē','to drink'],['买','mǎi','to buy'],['请','qǐng','please · to invite'],['可以','kěyǐ','may · can'],['多少','duōshao','how much · how many'],['怎么','zěnme','how'],['今天','jīntiān','today'],['明天','míngtiān','tomorrow'],['朋友','péngyou','friend'],['家','jiā','home · family'],['钱','qián','money'],['水','shuǐ','water']],
  2: [['因为','yīnwèi','because'],['所以','suǒyǐ','so · therefore'],['但是','dànshì','but · however'],['觉得','juéde','to feel · think'],['准备','zhǔnbèi','to prepare'],['开始','kāishǐ','to begin'],['已经','yǐjīng','already'],['一起','yìqǐ','together'],['比较','bǐjiào','relatively · rather'],['可能','kěnéng','possibly'],['帮助','bāngzhù','to help'],['告诉','gàosu','to tell'],['时间','shíjiān','time'],['事情','shìqing','matter · thing'],['地方','dìfang','place'],['公司','gōngsī','company'],['机场','jīchǎng','airport'],['火车','huǒchē','train'],['附近','fùjìn','nearby'],['需要','xūyào','to need'],['舒服','shūfu','comfortable'],['便宜','piányi','inexpensive'],['记得','jìde','to remember'],['认为','rènwéi','to consider · think']],
  3: [['安排','ānpái','to arrange'],['发现','fāxiàn','to discover'],['决定','juédìng','to decide'],['参加','cānjiā','to take part'],['完成','wánchéng','to complete'],['解决','jiějué','to solve'],['选择','xuǎnzé','to choose'],['提高','tígāo','to improve'],['注意','zhùyì','to pay attention'],['联系','liánxì','to contact'],['经过','jīngguò','to pass through'],['影响','yǐngxiǎng','to influence'],['清楚','qīngchu','clear'],['认真','rènzhēn','careful · serious'],['当然','dāngrán','of course'],['特别','tèbié','especially'],['后来','hòulái','later'],['终于','zhōngyú','finally'],['环境','huánjìng','environment'],['文化','wénhuà','culture'],['习惯','xíguàn','habit'],['机会','jīhuì','opportunity'],['银行','yínháng','bank'],['地图','dìtú','map']]
};

const detailed = new Map(starterLessons.map(x=>[x.id,x]));
const detailedByChapter = new Map([['1-1','greetings'],['1-8','cafe'],['2-7','directions'],['2-5','market'],['3-4','restaurant']]);
export const lessons = chapters.map(([level, hanziTitle, titlePinyin, title, topic, keyword, keywordMeaning], index) => {
  const unit = chapters.slice(0,index+1).filter(x=>x[0]===level).length;
  const id = `hsk${level}-${String(unit).padStart(2,'0')}`;
  const source = detailed.get(detailedByChapter.get(`${level}-${unit}`));
  const pool = pools[level];
  const chosen = Array.from({length:4},(_,i)=>pool[(index*3+i*5)%pool.length]);
  const vocab = [[hanziTitle,titlePinyin,title],...chosen];
  return {
    id, level, unit:String(unit).padStart(2,'0'), title, hanziTitle, titlePinyin, topic, duration:`${7+(unit%4)} min`,
    vocab:source?.vocab??vocab,
    grammar:source?.grammar??{title:topic.split(',')[0],rule:hanziTitle,detail:`Chapter ${unit} builds on this textbook pattern: ${topic.toLowerCase()}. Notice the word order and listen for it in the conversation.`,example:hanziTitle+'。',pinyin:titlePinyin+'。',translation:title+'.'},
    dialogue:source?.dialogue??[
      ['A',hanziTitle+'。',titlePinyin+'。',title+'.'],
      ['B','真的？你能再说一次吗？','Zhēn de? Nǐ néng zài shuō yí cì ma?','Really? Could you say that one more time?'],
      ['A','当然可以。我们一起练习吧。','Dāngrán kěyǐ. Wǒmen yìqǐ liànxí ba.','Of course. Let’s practice together.'],
      ['B','好啊，谢谢你！','Hǎo a, xièxie nǐ!','Sure, thank you!']
    ]
  };
});
