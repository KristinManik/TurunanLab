const input=document.getElementById('functionInput'), calcResult=document.getElementById('calcResult');
function derivative(poly){
 let s=poly.toLowerCase().replace(/\s+/g,'').replace(/−/g,'-').replace(/²/g,'^2').replace(/³/g,'^3');
 if(!s) throw Error('Masukkan fungsi terlebih dahulu.');
 // Split into signed terms, allowing a leading sign.
 const terms=s.match(/[+-]?[^+-]+/g); if(!terms) throw Error('Format fungsi belum dikenali.');
 let out=[];
 for(let t of terms){
  let sign=1;if(t[0]==='+')t=t.slice(1);else if(t[0]==='-'){sign=-1;t=t.slice(1)}
  if(!t)continue;
  let coef,power;
  if(t.includes('x')){
   if((t.match(/x/g)||[]).length!==1)throw Error('Setiap suku hanya boleh memiliki satu x.');
   const parts=t.split('x');let c=parts[0];coef=c===''?1:Number(c);if(!Number.isFinite(coef))throw Error('Koefisien tidak valid.');
   const p=parts[1]||'';if(p!==''&&!/^\^-?\d+$/.test(p))throw Error('Pangkat gunakan format x^2, x^3, dan seterusnya.');
   power=p===''?1:Number(p);if(power<0||!Number.isInteger(power))throw Error('Gunakan pangkat bilangan bulat nonnegatif.');
  }else{coef=Number(t);power=0;if(!Number.isFinite(coef))throw Error('Suku "'+t+'" tidak valid.');}
  coef*=sign;
  if(power===0)continue;
  out.push({c:coef*power,p:power-1});
 }
 // Combine like powers
 const combined={};out.forEach(a=>combined[a.p]=(combined[a.p]||0)+a.c);
 const powers=Object.keys(combined).map(Number).filter(p=>Math.abs(combined[p])>1e-10).sort((a,b)=>b-a);
 if(!powers.length)return '0';
 return powers.map((p,i)=>{let c=combined[p],abs=Math.abs(c),v;
  if(p===0)v=String(abs);else{let cs=abs===1?'':String(abs);v=cs+'x'+(p===1?'':'^'+p);}
  return (i===0?(c<0?'-':''):(c<0?' - ':' + '))+v;
 }).join('');
}
document.getElementById('deriveBtn').addEventListener('click',()=>{try{calcResult.className='result';calcResult.innerHTML='<strong>Hasil:</strong> f′(x) = <b>'+derivative(input.value).replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</b>';}catch(e){calcResult.className='result error';calcResult.textContent=e.message;}});
input.addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('deriveBtn').click()});
const bank={
 basic:[
 {q:'Turunan dari f(x) = x⁴ adalah …',a:['4x³','x³','4x⁴','x⁵'],correct:0,why:'Gunakan aturan pangkat: d/dx(xⁿ) = nxⁿ⁻¹, jadi 4x³.'},
 {q:'Turunan konstanta f(x) = 12 adalah …',a:['12','1','0','x'],correct:2,why:'Turunan konstanta selalu 0.'},
 {q:'Jika f(x) = 5x, maka f′(x) = …',a:['5','5x','x','0'],correct:0,why:'Turunan x adalah 1, sehingga turunan 5x adalah 5.'},
 {q:'Turunan f(x) = 2x³ + x² adalah …',a:['6x² + 2x','2x² + x','6x³ + 2x²','3x² + 2x'],correct:0,why:'Turunkan setiap suku: 2x³ menjadi 6x² dan x² menjadi 2x.'},
 {q:'Turunan f(x) = x² − 7x + 3 adalah …',a:['2x − 7','x − 7','2x + 3','2x − 7x'],correct:0,why:'x² → 2x, −7x → −7, dan 3 → 0.'},
 {q:'Turunan f(x) = 4x⁵ adalah …',a:['20x⁴','4x⁴','5x⁴','20x⁵'],correct:0,why:'Kalikan koefisien 4 dengan pangkat 5, lalu pangkat menjadi 4.'},
 {q:'Turunan f(x) = 3x² − 4 adalah …',a:['6x','3x','6x − 4','3x²'],correct:0,why:'3x² menjadi 6x dan konstanta −4 menjadi 0.'},
 {q:'Turunan f(x) = 6x³ − 2x adalah …',a:['18x² − 2','18x² − 2x','6x² − 2','18x³ − 2'],correct:0,why:'6x³ → 18x² dan −2x → −2.'},
 {q:'Turunan f(x) = 9x adalah …',a:['9','9x','x','0'],correct:0,why:'Turunan ax adalah a.'},
 {q:'Turunan f(x) = x⁶ − x³ adalah …',a:['6x⁵ − 3x²','6x⁶ − 3x³','x⁵ − x²','6x⁵ − x²'],correct:0,why:'Gunakan aturan pangkat pada kedua suku.'}],
 medium:[
 {q:'Turunan f(x) = 3x⁴ − 2x³ + 5x − 8 adalah …',a:['12x³ − 6x² + 5','12x³ − 2x² + 5','3x³ − 6x² + 5','12x⁴ − 6x³ + 5'],correct:0,why:'Turunkan tiap suku: 12x³, −6x², 5, dan 0.'},
 {q:'Jika f(x) = (x² + 1)(x + 2), bentuk turunan yang benar sebelum disederhanakan adalah …',a:['2x(x + 2) + (x² + 1)','2x(x + 2) − (x² + 1)','(x² + 1)(1)','2(x + 2) + x² + 1'],correct:0,why:'Aturan perkalian: (fg)′ = f′g + fg′. Dengan f=x²+1 dan g=x+2, diperoleh 2x(x+2) + (x²+1). Jika disederhanakan hasilnya 3x² + 4x + 1.'},
 {q:'Turunan f(x) = (2x + 1)³ adalah …',a:['3(2x + 1)²','6(2x + 1)²','3(2x + 1)','6(2x + 1)³'],correct:1,why:'Aturan rantai: 3(2x+1)² dikali turunan bagian dalam, yaitu 2.'},
 {q:'Turunan f(x) = 1/x (untuk x ≠ 0) adalah …',a:['1/x²','−1/x²','−x²','1'],correct:1,why:'Tulis 1/x sebagai x⁻¹. Turunannya −x⁻² = −1/x².'},
 {q:'Turunan f(x) = x³ + 4x² − 2x + 9 adalah …',a:['3x² + 8x − 2','3x² + 4x − 2','x² + 8x − 2','3x³ + 8x² − 2'],correct:0,why:'Gunakan aturan pangkat dan turunkan setiap suku.'},
 {q:'Jika f(x) = (x² + 3)², maka f′(x) adalah …',a:['2(x²+3)','4x(x²+3)','2x(x²+3)','4x(x²+3)²'],correct:1,why:'Aturan rantai: 2(x²+3) dikali turunan bagian dalam 2x.'},
 {q:'Turunan f(x) = 7x⁴ + 3x² − x adalah …',a:['28x³ + 6x − 1','28x³ + 3x − 1','7x³ + 6x','28x⁴ + 6x² − 1'],correct:0,why:'7x⁴ → 28x³, 3x² → 6x, dan −x → −1.'},
 {q:'Turunan f(x) = sin x adalah …',a:['−sin x','cos x','−cos x','tan x'],correct:1,why:'Rumus dasar: d/dx(sin x) = cos x.'},
 {q:'Turunan f(x) = x² / x (untuk x ≠ 0) dapat disederhanakan menjadi …',a:['2x','1','x','0'],correct:2,why:'x²/x = x untuk x ≠ 0, jadi turunannya 1. Perhatikan pilihan yang benar seharusnya 1.'},
 {q:'Turunan f(x) = eˣ adalah …',a:['xeˣ⁻¹','eˣ','ln x','1/x'],correct:1,why:'Fungsi eksponensial alami eˣ adalah turunannya sendiri.'}],
 concept:[
 {q:'Apa arti turunan fungsi pada suatu titik secara geometris?',a:['Luas di bawah kurva','Kemiringan garis singgung','Panjang kurva','Titik potong sumbu-y'],correct:1,why:'Turunan pada titik menyatakan kemiringan garis singgung kurva di titik tersebut.'},
 {q:'Berapakah turunan fungsi konstan?',a:['1','Konstanta itu sendiri','0','Tidak terdefinisi'],correct:2,why:'Fungsi konstan tidak berubah terhadap x, sehingga laju perubahannya nol.'},
 {q:'Dalam aturan pangkat, apa yang dilakukan pada pangkat setelah diturunkan?',a:['Ditambah 1','Dikurangi 1','Dikuadratkan','Tetap sama'],correct:1,why:'Pangkat dikurangi satu setelah pangkat lama dikalikan ke koefisien.'},
 {q:'Jika f′(x) > 0 pada suatu interval, fungsi biasanya …',a:['Menurun','Konstan','Meningkat','Selalu nol'],correct:2,why:'Turunan positif berarti fungsi meningkat pada interval tersebut.'},
 {q:'Aturan apa yang tepat untuk turunan dua fungsi yang dikalikan?',a:['Aturan rantai','Aturan perkalian','Aturan pembagian','Aturan konstanta'],correct:1,why:'Gunakan (fg)′ = f′g + fg′.'},
 {q:'Turunan f(x) = 5x² adalah 10x. Mengapa?',a:['Pangkat dikurangi 1 dan koefisien dikali pangkat','Koefisien dihapus','Pangkat ditambah 1','Semua suku jadi nol'],correct:0,why:'Aturan pangkat: 5 × 2 = 10 dan pangkat 2 menjadi 1.'},
 {q:'Apa nama aturan untuk fungsi seperti (3x + 2)⁵?',a:['Aturan rantai','Aturan konstanta','Aturan pembagian','Aturan penjumlahan saja'],correct:0,why:'Ada fungsi di dalam fungsi, jadi gunakan aturan rantai.'},
 {q:'Jika f′(a) = 0, apa yang dapat disimpulkan langsung?',a:['Pasti maksimum','Pasti minimum','Garis singgung horizontal di x=a','Fungsi pasti konstan'],correct:2,why:'Turunan nol berarti kemiringan garis singgung horizontal; belum tentu maksimum atau minimum.'},
 {q:'Turunan digunakan untuk mengukur …',a:['Laju perubahan sesaat','Hanya luas','Hanya volume','Jumlah akar saja'],correct:0,why:'Turunan mengukur laju perubahan sesaat suatu fungsi.'},
 {q:'Turunan cos x adalah …',a:['sin x','−sin x','cos x','−cos x'],correct:1,why:'Rumus dasar: d/dx(cos x) = −sin x.'}]
};
bank.medium[8]={q:'Turunan f(x) = x² / x (untuk x ≠ 0) adalah …',a:['2x','1','x','0'],correct:1,why:'Sederhanakan x²/x = x untuk x ≠ 0. Turunan x adalah 1.'};

bank.hots=[
 {q:'Sebuah benda bergerak dengan posisi s(t) = t³ − 6t² + 9t (meter). Berapa kecepatannya saat t = 2 detik?',a:['−3 m/s','0 m/s','3 m/s','9 m/s'],correct:0,why:'Kecepatan adalah turunan posisi: v(t)=s′(t)=3t²−12t+9. Saat t=2, v(2)=12−24+9=−3 m/s, jadi jawabannya −3 m/s.'},
 {q:'Diketahui f(x)=x³−3x². Pada x=2, nilai f′(x) adalah …',a:['0','2','4','6'],correct:0,why:'Turunkan: f′(x)=3x²−6x. Substitusi x=2: 3(4)−12=0.'},
 {q:'Kurva f(x)=x²−4x+1 memiliki garis singgung horizontal ketika …',a:['x=−2','x=0','x=2','x=4'],correct:2,why:'Garis singgung horizontal saat f′(x)=0. Turunannya 2x−4=0, sehingga x=2.'},
 {q:'Sebuah biaya dinyatakan C(x)=2x²+10x+50. Turunan C′(x) yang menggambarkan biaya marginal adalah …',a:['2x+10','4x+10','4x+50','2x²+10'],correct:1,why:'Turunkan setiap suku: 2x² menjadi 4x, 10x menjadi 10, dan konstanta 50 menjadi 0. Jadi C′(x)=4x+10.'},
 {q:'Jika f′(x)=6x−12, pada interval mana f menurun?',a:['x<2','x>2','x≠2','semua x'],correct:0,why:'Fungsi menurun saat turunannya negatif. 6x−12<0 menghasilkan x<2.'},
 {q:'Diketahui f(x)=(x²+1)³. Turunan yang benar adalah …',a:['3(x²+1)²','6x(x²+1)²','3x²(x²+1)²','6(x²+1)³'],correct:1,why:'Aturan rantai: turunan pangkat luar 3(x²+1)² dikali turunan bagian dalam 2x, hasilnya 6x(x²+1)².'},
 {q:'Sebuah persegi memiliki sisi x cm dan luas A(x)=x². Laju perubahan luas terhadap sisi saat x=5 cm adalah …',a:['5 cm','10 cm','25 cm²','2 cm'],correct:1,why:'A′(x)=2x. Pada x=5, A′(5)=10. Artinya luas berubah 10 cm² untuk setiap perubahan sisi 1 cm pada titik itu.'},
 {q:'Fungsi f(x)=x³−3x memiliki titik kritis saat …',a:['x=0 saja','x=1 saja','x=−1 dan x=1','x=−3 dan x=3'],correct:2,why:'f′(x)=3x²−3=3(x²−1). Setarakan dengan nol: x²=1, sehingga x=−1 atau x=1.'},
 {q:'Diketahui f(x)=x³−6x²+9x. Pada x=1, berapa nilai f′(1)?',a:['−2','0','2','6'],correct:1,why:'Turunkan fungsi: f′(x)=3x²−12x+9. Substitusi x=1: 3−12+9=0. Jadi jawaban yang benar adalah 0.'},
 {q:'Sebuah fungsi memiliki f′(x)=(x−1)(x+2). Titik mana yang membuat garis singgung horizontal?',a:['x=−2 dan x=1','x=−1 dan x=2','x=0 saja','x=−2 saja'],correct:0,why:'Garis singgung horizontal saat f′(x)=0. Dari (x−1)(x+2)=0 diperoleh x=1 atau x=−2.'}
 ];

let questions=[],index=0,score=0,answered=0,locked=false,remaining=60,timerId=null,started=false,selected=null;
const $=id=>document.getElementById(id);
function shuffle(arr){return arr.slice().sort(()=>Math.random()-.5)}
function updateStats(){$('answeredCount').textContent=answered+' / 10';$('correctCount').textContent=score;$('sessionProgress').style.width=(answered/10*100)+'%'}
function stopTimer(){if(timerId){clearInterval(timerId);timerId=null}}
function startTimer(){stopTimer();remaining=60;showTime();timerId=setInterval(()=>{remaining--;showTime();if(remaining<=0){stopTimer();if(!locked){locked=true;const q=questions[index];$('feedback').innerHTML='<strong>Waktu habis.</strong><br>Jawaban yang benar: <b>'+String.fromCharCode(65+q.correct)+'. '+q.a[q.correct]+'</b><br><b>Penyelesaian:</b> '+q.why;$('feedback').style.background='#fff8e8';$('feedback').style.border='1px solid #f0dfb4';$('feedback').style.borderRadius='10px';$('feedback').style.padding='12px';$('nextBtn').classList.remove('hidden');document.querySelectorAll('.choice').forEach(b=>{b.disabled=true;if([...document.querySelectorAll('.choice')].indexOf(b)===q.correct)b.classList.add('correct')});answered++;updateStats();if(index===9)$('nextBtn').textContent='Lihat hasil';}}},1000)}
function showTime(){$('timer').textContent=String(Math.floor(remaining/60)).padStart(2,'0')+':'+String(remaining%60).padStart(2,'0');$('timer').style.color=remaining<=10?'#c34444':'#4169e1'}
function begin(){const mode=$('modeSelect').value;const selectedBank=mode==='easy'?bank.basic:mode==='mix'?[...bank.basic,...bank.medium,...bank.hots,...bank.concept]:bank[mode];questions=shuffle(selectedBank).slice(0,10);index=0;score=0;answered=0;locked=false;started=true;$('modeLabel').textContent='Mode latihan: '+({mix:'Campuran semua level',easy:'Mudah',basic:'Mudah',medium:'Medium',hots:'HOTS',concept:'Konsep turunan'}[mode]);$('startBtn').classList.add('hidden');$('restartBtn').classList.add('hidden');$('finalResult').classList.add('hidden');updateStats();renderQuestion()}
function renderQuestion(){locked=false;selected=null;const q=questions[index];$('questionCount').textContent='Soal '+(index+1)+' dari 10';$('progressBar').style.width=(index/10*100)+'%';$('questionText').textContent=q.q;$('feedback').textContent='';$('choices').innerHTML='';q.a.forEach((a,i)=>{const b=document.createElement('button');b.className='choice';b.innerHTML='<span class="letter">'+String.fromCharCode(65+i)+'</span><span></span>';b.lastChild.textContent=a;b.addEventListener('click',()=>choose(i,b));$('choices').appendChild(b)});$('nextBtn').classList.add('hidden');$('nextBtn').textContent=index===9?'Lihat hasil':'Soal berikutnya →';startTimer()}
function choose(i,btn){if(locked)return;locked=true;stopTimer();const q=questions[index];selected=i;answered++;const ok=i===q.correct;if(ok)score++;document.querySelectorAll('.choice').forEach((b,j)=>{b.disabled=true;if(j===q.correct)b.classList.add('correct');if(j===i&&!ok)b.classList.add('wrong')});$('feedback').innerHTML=ok?('<strong>Benar!</strong><br><b>Penyelesaian:</b> '+q.why):('<strong style="color:#b63b3b">Belum tepat.</strong><br>Jawaban kamu: <b>'+String.fromCharCode(65+i)+'. '+q.a[i]+'</b><br>Jawaban yang benar: <b>'+String.fromCharCode(65+q.correct)+'. '+q.a[q.correct]+'</b><br><b>Penyelesaian:</b> '+q.why);$('feedback').style.background=ok?'#effaf5':'#fff5f4';$('feedback').style.border='1px solid '+(ok?'#c9e9dc':'#f3d0cc');$('feedback').style.borderRadius='10px';$('feedback').style.padding='12px';$('progressBar').style.width=((index+1)/10*100)+'%';$('nextBtn').classList.remove('hidden');updateStats()}
function next(){if(!locked)return;if(index<9){index++;renderQuestion()}else finish()}
function finish(){stopTimer();$('questionText').textContent='Latihan selesai!';$('choices').innerHTML='';$('feedback').textContent='';$('nextBtn').classList.add('hidden');$('progressBar').style.width='100%';$('timer').textContent='Selesai';$('finalResult').classList.remove('hidden');$('finalResult').innerHTML='<strong>Skor akhir: '+score+'/10 ('+(score*10)+'%)</strong><br>'+(score>=8?'Hebat! Kamu sudah memahami banyak konsep turunan.':score>=5?'Bagus! Tinjau lagi pembahasan soal yang belum tepat.':'Terus berlatih. Baca kembali ringkasan rumus, lalu coba lagi.')+'<br><button class="btn primary" id="againBtn" style="margin-top:12px">Coba lagi</button>';$('againBtn').addEventListener('click',begin);$('restartBtn').classList.remove('hidden')}
$('startBtn').addEventListener('click',begin);$('nextBtn').addEventListener('click',next);$('restartBtn').addEventListener('click',begin);$('modeSelect').addEventListener('change',()=>{if(started){stopTimer();$('questionText').textContent='Jenis latihan berubah. Tekan Mulai latihan untuk memulai sesi baru.';$('choices').innerHTML='';$('feedback').textContent='';$('startBtn').classList.remove('hidden');$('nextBtn').classList.add('hidden');$('restartBtn').classList.add('hidden');started=false;}});
