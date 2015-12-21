// JavaScript Document
window.onload=function(){
		var oLi1=document.getElementById('z1');	
		var oLi2=document.getElementById('z2');	
		var oLi3=document.getElementById('z3');	
		var oLi4=document.getElementById('z4');	
		var obox1=document.getElementById('z1_l');
		var obox2=document.getElementById('z2_l');
		var obox3=document.getElementById('z3_l');
		var obox4=document.getElementById('z4_l');
			function clear3(){
				oLi1.className='';
				oLi2.className='';
				oLi3.className='';
				oLi4.className='';
			}
			function clear4(){
				obox1.className='list';
			    obox2.className='list';
				obox3.className='list';
				obox4.className='list';	
			}
		
			oLi1.onmouseover=function(){
			clear3();
			clear4();
			this.className='active1';
			obox1.className='list show';	
		    }	
				
			oLi2.onmouseover=function(){
		    clear3();
			clear4();
			this.className='active';
			obox2.className='list show';	
		    }	
			oLi3.onmouseover=function(){
		    clear3();
			clear4();
			this.className='active';
			obox3.className='list show';	
		    }	
			oLi4.onmouseover=function(){
			clear3();
			clear4();
			this.className='active2';
			obox4.className='list show';	
		    }	
		
			
		var trip=document.getElementsByClassName('trip')[0];
		var pic=trip.getElementsByClassName('pic')[0];
		var xia=document.getElementsByClassName('xia')[0];
		trip.onmouseover=function(){
			this.className='trip active';
			xia.style.display='block';	
			pic.className='pic zise';
		}	
		trip.onmouseout=function(){
			this.className='trip';
			xia.style.display='none';
			pic.className='pic';	
		}	
		
		
		var shu=document.getElementsByClassName('shu')[0];
		var sheng=document.getElementsByClassName('sheng')[0];
		var shou=document.getElementsByClassName('shou')[0];
		var mo=document.getElementsByClassName('mo')[0];
		var zhan=document.getElementsByClassName('zhan')[0];
		var ci=document.getElementsByClassName('ci')[0];
		var tuji=document.getElementsByClassName('tu')[0];
		var oDiv=tuji.getElementsByTagName('div');
		function clear1(){
			shu.className='shu';
			sheng.className='sheng';
			shou.className='shou';
			mo.className='mo';
			zhan.className='zhan';
			ci.className='ci';	
		}
		function clear2(){
			oDiv[0].className='tu1';
			oDiv[1].className='tu2';
			oDiv[2].className='tu3';
			oDiv[3].className='tu4';
			oDiv[4].className='tu5';
			oDiv[5].className='tu6';	
		}
		shu.onmouseover=function(){
			clear1();
			clear2();
			this.className='shu active1';
			oDiv[0].className='tu1 show';
			
		}
		sheng.onmouseover=function(){
			clear1();
			clear2();
			this.className='sheng active2';	
			oDiv[1].className='tu2 show';
		}
		shou.onmouseover=function(){
			clear1();
			clear2();
			this.className='shou active3';
			oDiv[2].className='tu3 show';	
		}
		mo.onmouseover=function(){
			clear1();
			clear2();
			this.className='mo active4';
			oDiv[3].className='tu4 show';	
		}
		zhan.onmouseover=function(){
			clear1();
			clear2();
			this.className='zhan active5';
			oDiv[4].className='tu5 show';	
		}
		ci.onmouseover=function(){
		    clear1();
			clear2();
			this.className='ci active6';
			oDiv[5].className='tu6 show';	
		}
		
		
		var mode1=document.getElementById('mode1');
		var mode2=document.getElementById('mode2');
		var mode3=document.getElementById('mode3');
		move(mode1);
		move(mode2);
		move(mode3);
		function move(obj){
		var zoom1=obj.getElementsByClassName('zoom')[0];
		var nav=zoom1.getElementsByTagName('ul')[0];
		var aLi=nav.getElementsByTagName('li');
		var lbox1=obj.getElementsByClassName('lbox')[0];
		var abDiv=lbox1.getElementsByTagName('div');
		  function clear6(){
			abDiv[0].className='box1 clearfix';	
			abDiv[1].className='box2';
			abDiv[2].className='box3';	 
		 }
		  function clear7(){
			abDiv[0].className='box1 clearfix';	
			abDiv[1].className='box2'; 
		 }
		 
		 for(var i=0;i<aLi.length-1;i++){  
		 aLi[i].index=i;
		 aLi[i].onmouseover=function(){
			 for(var j=0;j<aLi.length-1;j++){
				aLi[j].className='';	 
				}
				
			if(abDiv.length==3){
				clear6();	
			}else{
				clear7();
			}
			
			this.className='active';
			if(this.index==0){
				abDiv[0].className='box1 show clearfix';	
			}else if(this.index==1){
				abDiv[1].className='box2 show';
			}else{abDiv[2].className='box3 show';}	 
		 }
		 }
		
			
		}
		
		var nv2=document.getElementById('nv2');	
		var aaLi=nv2.getElementsByTagName('li');
		for(var i=0;i<aaLi.length;i++){
		aaLi[i].onmouseover=function(){
			for(var i=0;i<aaLi.length;i++){
				aaLi[i].className='';	
			}
			this.className='active';	
		}	
	}
	
	     
	 var nav5=document.getElementById('nav5');
	 var oLi5=nav5.getElementsByClassName('list');
	 var huan=document.getElementsByClassName('huan');
	  	for(var i=0;i<oLi5.length;i++){
			oLi5[i].index=i;
			oLi5[i].onmouseover=function(){
				
				huan[this.index].style.display='block';
			}
			oLi5[i].onmouseout=function(){
				huan[this.index].style.display='none';	
			}	
		}
		
		
		var con3_l=document.getElementsByClassName('con3_l')[0];
		var bLi = con3_l.getElementsByTagName('li');
		var con3_p=con3_l.getElementsByTagName('p')[0];
		var con3_a=con3_p.getElementsByTagName('a');
		
		for(var i=0;i<con3_a.length;i++){
			con3_a[i].index=i;
			con3_a[i].onmouseover=function(){
				for(var i=0;i<con3_a.length;i++){
				con3_a[i].className='';
				bLi[i].className='';	
				}
				this.className='active';
				bLi[this.index].className='show';	
			}	
		}
	}