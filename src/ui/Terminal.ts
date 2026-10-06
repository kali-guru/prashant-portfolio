export const commands = ['help','about','whoami','education','skills','certificates','projects','contact','cv','ls','pwd','cat','write','rm','echo','scan','history','clear','reset'];
const about = 'Prashant Gurung | Ethical Hacking & Cybersecurity student\nKathmandu, Nepal. Seeking internship and entry-level opportunities.\nI am developing security foundations through my degree and structured learning.';
const education = 'BSc Ethical Hacking and Cybersecurity (studying)\nSoftwarica College of IT & E-commerce, Kathmandu, Nepal.';
const skills = 'LEARNING AREAS\nWeb fundamentals, cybersecurity foundations, authorized penetration-testing methodology and security education.\nThese are study areas supported by completed learning paths, not claims of professional experience.';
const certificates = 'TRYHACKME / LEARNING-PATH COMPLETION\nPre Security: 30 April 2025\nCyber Security 101: 13 May 2025\nWeb Fundamentals: 14 May 2025\nJr Penetration Tester: 15 May 2025\n\nRED TEAM LEADERS\nCertified Cybersecurity Educator Professional: 24 December 2025\nOriginal PDFs are in the Credentials section. Issued name: Prasan gurung.';
const contact = 'Email: hello@prashantgrg.com.np\nPhone: +977 9768594758\nGitHub: github.com/kali-guru\nLinkedIn: linkedin.com/in/prasan-gurung-769832367/\nTryHackMe: tryhackme.com/p/stoicpg';
const projects = 'Interactive cybersecurity portfolio (2026)\nStatic TypeScript/Vite website with an educational terminal and globe. Developed with AI assistance.\nSource: github.com/kali-guru/prashant-portfolio';
export class PortfolioShell {
  private files = new Map<string,string>();
  private readonly protectedFiles = new Set(['about.txt','education.txt','skills.txt','certificates.txt','contact.txt','projects.txt']);
  history: string[] = [];
  constructor() { this.reset(); }
  private reset(): void {this.files = new Map([['about.txt',about],['education.txt',education],['skills.txt',skills],['certificates.txt',certificates],['contact.txt',contact],['projects.txt',projects],['notes.txt','Your temporary workspace. Try: write notes.txt Hello Prashant']]);}
  run(raw: string): {text: string; clear?: boolean; cv?: boolean} {
    const input = raw.trim().slice(0,240); if (!input) return {text:''};
    this.history.push(input); if (this.history.length > 50) this.history.shift();
    const [command, ...args] = input.split(/\s+/); const argument = args.join(' ');
    switch (command.toLowerCase()) {
      case 'help': return {text:'PORTFOLIO\nabout · whoami · education · skills · certificates · projects · contact · cv\n\nSANDBOX\npwd · ls · cat <file> · write <file> <text> · rm <file> · echo <text>\nscan demo: read a fictional security-check example\nhistory · clear · reset\n\nOnly these commands are supported. This is a local simulation, not a system shell.'};
      case 'about': case 'whoami': return {text:about};
      case 'education': return {text:education}; case 'skills': return {text:skills};
      case 'certificates': return {text:certificates}; case 'projects': return {text:projects};
      case 'contact': return {text:contact}; case 'cv': return {text:'Download the current student CV:',cv:true};
      case 'pwd': return {text:'/home/guest/portfolio'};
      case 'ls': return {text:[...this.files.keys()].join('\n')};
      case 'cat': return {text:this.files.get(argument) ?? 'File not found. Use ls to see available files.'};
      case 'write': {
        const name=args[0];
        if (!name || !/^[a-zA-Z0-9_-]{1,40}\.txt$/.test(name) || args.length<2) return {text:'Usage: write notes.txt your text (simple .txt names only)'};
        if (this.protectedFiles.has(name)) return {text:'Portfolio files are read-only. Write to notes.txt or a new .txt file.'};
        if (!this.files.has(name) && this.files.size>=20) return {text:'Workspace is full. Remove a note with rm or use reset.'};
        this.files.set(name,args.slice(1).join(' '));return {text:'Saved '+name+' in this session only.'};
      }
      case 'rm': if (this.protectedFiles.has(argument)) return {text:'Portfolio files are read-only.'}; return {text:this.files.delete(argument)?'Removed '+argument:'File not found.'};
      case 'echo': return {text:argument};
      case 'scan': return {text:argument==='demo'?'FICTIONAL DEMO / NO NETWORK REQUESTS\nTarget: training.local (example only)\n[CHECK] Inventory authorized assets\n[CHECK] Review exposed services and access controls\n[CHECK] Document evidence and remediation\nThis illustrates a workflow; no scan ran and no real findings are claimed.':'Use scan demo. External targets and real scans are not supported.'};
      case 'history': return {text:this.history.map((line,i)=>String(i+1).padStart(2,' ')+'  '+line).join('\n')};
      case 'clear': return {text:'',clear:true};
      case 'reset': this.reset();this.history=[];return {text:'Virtual workspace reset. Type help to explore.',clear:true};
      default:return {text:'Unknown command: '+command+'. Type help for supported commands.'};
    }
  }
}
export function initTerminal(): void {
  const form=document.querySelector<HTMLFormElement>('#terminal-form'),input=document.querySelector<HTMLInputElement>('#terminal-input'),output=document.querySelector<HTMLElement>('#terminal-output');
  if (!form||!input||!output) return;
  const shell=new PortfolioShell();let index=0,draft='';
  const append=(text:string,kind=''):void=>{const row=document.createElement('p');row.className=kind;row.textContent=text;output.append(row);};
  const run=(value:string):void=>{
    if (!value.trim())return;
    const result=shell.run(value);
    if(result.clear)output.replaceChildren();else append('guest:~ $ '+value,'terminal-command');
    if(result.text)append(result.text);
    if(result.cv){const a=document.createElement('a');a.href='Prashant-Gurung-CV.pdf';a.download='Prashant-Gurung-CV.pdf';a.textContent='Download Prashant Gurung CV (PDF) ↓';output.append(a);}
    while(output.children.length>80)output.firstElementChild?.remove();
    output.scrollTop=output.scrollHeight;input.value='';draft='';index=shell.history.length;
  };
  form.addEventListener('submit',event=>{event.preventDefault();run(input.value);});
  input.addEventListener('keydown',event=>{
    if(event.key==='ArrowUp'||event.key==='ArrowDown'){event.preventDefault();if(index===shell.history.length)draft=input.value;index=Math.max(0,Math.min(shell.history.length,index+(event.key==='ArrowUp'?-1:1)));input.value=index===shell.history.length?draft:shell.history[index];}
    if(event.key==='Tab'&&input.value.trim()&&!input.value.includes(' ')){const matches=commands.filter(c=>c.startsWith(input.value));if(matches.length===1){event.preventDefault();input.value=matches[0];}}
  });
  document.querySelectorAll<HTMLButtonElement>('[data-command]').forEach(button=>button.addEventListener('click',()=>{run(button.dataset.command||'help');input.focus({preventScroll:true});}));
}
