const p = `![SIR Markov Chain](/assets/projects/sir-markov-chain/images/cover.png)`;
console.log(p.startsWith('!['), p.match(/^!\[(.*?)\]\((.*?)\)/));
