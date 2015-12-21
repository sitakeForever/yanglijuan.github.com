// JavaScript Document

window.onload=function(){
	//header1 左边下拉
	(function(){
		var oPhone=document.getElementById('phone');
		var oA=oPhone.getElementsByClassName('p-a')[0];
		var oDiv=oPhone.getElementsByClassName('p-box')[0];
		oPhone.onmouseover=function(){
			oPhone.className='phone active';	
		};
		oPhone.onmouseout=function(){
			oPhone.className='phone';	
		};	
	})();
	
	//header1 右边下拉
	(function(){
		var aSlider=document.getElementsByClassName('m-slider1');
		for(var i=0; i<aSlider.length;i++)
		{
			aSlider[i].onmouseover=function(){
				this.className='m-slider1 active';	
			};
			aSlider[i].onmouseout=function(){
				this.className='m-slider1';	
			};	
		}
	})();
	
	//输入框下拉
	(function(){
		var oChoose=document.getElementById('choose1');
		var oI=oChoose.getElementsByTagName('i')[0];
		var oUp=oChoose.getElementsByClassName('up')[0];
		var oDown=oChoose.getElementsByClassName('down')[0];
		oChoose.onmouseover=function(){
			oUp.className='up active';	
			oI.style.backgroundPosition='-6px -25px';
			oDown.style.display='block';
			
		};
		oChoose.onmouseout=function(){
			oDown.style.display='none';
			oUp.className='up';	
			oI.style.backgroundPosition='0 -25px';
		};
		oDown.onclick=function(){
			var tmp=oUp.innerHTML;
			oUp.innerHTML=oDown.innerHTML;
			oDown.innerHTML=tmp;
			oDown.style.display='none';	
		};	
	})();
	
	//输入框效果
	(function(){
		var oSearch=document.getElementById('_search');
		var oPlace=oSearch.getElementsByClassName('place')[0];
		var oInp=oSearch.getElementsByTagName('input')[0];
		oPlace.onclick=oInp.onfocus=function(){
			oPlace.style.display='none';
			oInp.focus();	
		};
		oInp.onblur=function(){
			if(oInp.value=='')
			{
				oPlace.style.display='block';	
			}	
		};	
	})();
	
	//导航
	(function(){
		var oUl=document.getElementById('bignav');
		var aLi=oUl.children;
		var timer=null;
		for(var i=0;i<aLi.length;i++)
		{
			(function(index){
				aLi[i].onmouseover=function(){
					timer=setTimeout(function(){
						aLi[index].style.background='#00c3b0';	
					},200)	
				};	
				aLi[i].onmouseout=function(){
					clearTimeout(timer);
					timer=setTimeout(function(){
						aLi[index].style.background='#2bb8aa';	
					},200)	
				};		
			})(i);	
		}	
	})();
	
	//产品选项卡
	var oCon=document.getElementById('_con');
	var aBtn=oCon.getElementsByClassName('j-btn');
	var aBox=oCon.getElementsByClassName('j-box');
	//基础选项卡
	for(var i=0;i<aBtn.length;i++)
	{
		(function(index){
			aBtn[i].onmouseover=function(){
				for(var i=0;i<aBtn.length;i++)
				{
					aBtn[i].className='j-btn';
					aBox[i].className='j-box';	
				}
				aBtn[index].className='j-btn active';
				aBox[index].className='j-box active';
			};		
		})(i);
	}
	//上一个
};