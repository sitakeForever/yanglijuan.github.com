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
	
	//关闭广告
	(function(){
		var aClose=document.getElementsByClassName('close');
		for(var i=0; i<aClose.length;i++)
		{
			aClose[i].onclick=function(){
				this.parentNode.style.display='none';	
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
	//侧边栏
	(function(){
		var oUl=document.getElementById('j-ul');
		var aDiv=oUl.getElementsByClassName('j-box');
		var aLi=oUl.children;
		for(var i=0;i<aLi.length;i++)
		{
			(function(index){
				var timer=null;  //必须放封闭空间里面
				aLi[i].onmouseover=aDiv[i].onmouseover=function(){
					clearTimeout(timer);
					var oHint=aLi[index].getElementsByClassName('hint')[0];
					var oP=aLi[index].getElementsByClassName('l-list')[0];
					timer=setTimeout(function(){
						aLi[index].style.width='235px';
						aDiv[index].style.display='block';	
						aLi[index].style.background='#fff';
						oHint.style.display='none';
						oP.style.marginRight='22px';
						oUl.style.borderLeft='1px solid #bdbdc7';
						oUl.style.borderBottom='1px solid #bdbdc7';	
					},150);
				};
				aLi[i].onmouseout=aDiv[i].onmouseout=function(){
					clearTimeout(timer);
					timer=setTimeout(function(){
						var oHint=aLi[index].getElementsByClassName('hint')[0];
						var oP=aLi[index].getElementsByClassName('l-list')[0];
						aLi[index].style.width='234px';
						aDiv[index].style.display='none';	
						aLi[index].style.background='';
						oHint.style.display='block';
						oP.style.marginRight='21px';
						oUl.style.borderLeft='1px solid #eee';
						oUl.style.borderBottom='1px solid #eee';	
					},150);
						
				};		
			})(i);
		}	
	})();
	
	//轮播
	(function(){
		var oNav=document.getElementById('nav2');
		var oLeft=document.getElementById('left1');
		var num=document.getElementById('_left');
		var left=0;//初始left值
		var n=0;  //初始index值  0-5
		var total=6;
		var nT=690;
		//左走
		oLeft.onclick=goLeft;
		
		//右走
		var oRight=document.getElementById('right1');
		oRight.onclick=goRight;
		
		//一直走
		var timer=setInterval(function(){
			goRight();		
		},800);
		
		//鼠标移入停止
		var oScroll=document.getElementById('scroll');
			oScroll.onmouseover=function(){
				oLeft.style.display='block';
				oRight.style.display='block';
				clearInterval(timer);	
		};
		oScroll.onmouseout=function(){
			timer=setInterval(function(){
				oLeft.style.display='none';
				oRight.style.display='none';
				goRight();
			},800);	
		};
		
		
		function goLeft(){
			n--;
			if(n==-1)
			{
				n=total-1;	
			}
			num.innerHTML=n+1;
			left=-n*nT;
			oNav.style.left=left+'px';	
		};
	
		function goRight(){
			n++;
			if(n==total)
			{
				n=0;	
			}
			num.innerHTML=n+1;
			left=-n*nT;
			oNav.style.left=left+'px';		
		};	
	})();
	//轮播2
	(function(){
		var oLPot=document.getElementById('l-pot');
		oLPot.index=0;
		var oRPot=document.getElementById('r-pot');
		oRPot.index=1;
		var oUl=document.getElementById('nav4');
		var aLi=oUl.children;
		var n=0; //初始下标值
		var nT=197;
		var total=2;
		var arr=[];
		arr.push(oLPot);
		arr.push(oRPot);
		for(var i=0;i<arr.length;i++)
		{
			(function(index){
				arr[i].onclick=function(){
					n=index;
					tick();
				};	
			})(i);
				
		}
		
		var oLeft=document.getElementById('l-left');
		oLeft.onclick=function(){
			n--;
			if(n==-1)
			{
				n=total-1;	
			}
			tick();	
		};
		var oRight=document.getElementById('r-right');
		oRight.onclick=function(){
			n++;
			if(n==total)
			{
				n=0;	
			}
			tick();	
		};
		//
		var timer=setInterval(function(){
			n++;
			if(n==total)
			{
				n=0;	
			}
			tick();		
		},900);
		
		var oScroll=document.getElementById('scroll2');
		oScroll.onmouseover=function(){
			oLeft.style.display='block';
			oRight.style.display='block';
			clearInterval(timer);	
		};
		oScroll.onmouseout=function(){
			oLeft.style.display='none';
			oRight.style.display='none';
			timer=setInterval(function(){
				n++;
				if(n==total)
				{
					n=0;	
				}
				tick();		
			},900);	
		};
		function tick()
		{
			for(var i=0;i<arr.length;i++)
			{
				arr[i].className='';	
			}
			arr[n].className='active';
			oUl.style.left=-n*nT+'px';	
		}	
	})();
	
	
	//倒计时
	(function(){
		var oClock=document.getElementById('clock');
		var aI=oClock.getElementsByTagName('i');
		tick();
		setInterval(tick,1000);
		//函数
		function toDou(n)
		{
			return n<10?'0'+n:''+n;	
		}
		function tick()
		{
			//当前时间
			var oNow=new Date();
			var t1=oNow.getTime();
			//目标时间
			var oDate=new Date();
			oDate.setDate(11);
			oDate.setHours(0,0,0,0);
			var t2=oDate.getTime();
			//总时间
			var total=Math.floor((t2-t1)/1000);
			//计算
			var h=Math.floor(total/3600);
			total%=3600;
			var m=Math.floor(total/60);
			total%=60;
			var s=total;
			//拼接
			var str=toDou(h)+toDou(m)+toDou(s)+'';
			//显示
			for(var i=0; i<aI.length;i++)
			{
				aI[i].innerHTML=str.charAt(i);	
			}	
		}
		
		
	})();
	
	
	
	//轮播3
	(function(){
		var oNav=document.getElementById('nav5');
		var oLeft=document.getElementById('left2');
		var num=document.getElementById('_left2');
		var left=0;//初始left值
		var n=0;  //初始index值  0-4
		var total=5;
		var nT=1175;
		//左走
		oLeft.onclick=goLeft;
		
		//右走
		var oRight=document.getElementById('right2');
		oRight.onclick=goRight;
		
		//一直走
		var timer=setInterval(function(){
			setTimeout(function(){
				goRight();
			},100)
					
		},1000);
		
		//鼠标移入停止
		var oScroll=document.getElementById('scroll3');
			oScroll.onmouseover=function(){
				oLeft.style.display='block';
				oRight.style.display='block';
				clearInterval(timer);	
		};
		oScroll.onmouseout=function(){
			timer=setInterval(function(){
				oLeft.style.display='none';
				oRight.style.display='none';
				goRight();
			},1000);	
		};
		
		
		function goLeft(){
			n--;
			if(n==-1)
			{
				n=total-1;	
			}
			num.innerHTML=n+1;
			left=-n*nT;
			oNav.style.left=left+'px';	
		};
	
		function goRight(){
			n++;
			if(n==total)
			{
				n=0;	
			}
			num.innerHTML=n+1;
			left=-n*nT;
			oNav.style.left=left+'px';		
		};	
	})();
	
	//更多下拉
	(function(){
		var oMore=document.getElementById('more');
		var oDl=document.getElementById('dl3');
		oMore.onmouseover=function(){
			oDl.className='clearfix dl3 active';	
		};
		oMore.onmouseout=function(){
			oDl.className='clearfix dl3';	
		};	
	})();
	
	//图片延时加载
	var aImg=document.getElementsByTagName('img');
	var clientHeight=document.documentElement.clientHeight;  //可视区高度
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		var clientBottom=scrollTop+clientHeight;
		for(var i=0;i<aImg.length;i++)
		{
			if(aImg[i].offsetTop<clientBottom)
			{
				var src=aImg[i].getAttribute('_src');
				aImg[i].src=src;	
			}	
		}
	window.onscroll=window.onresize=function(){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		var clientBottom=scrollTop+clientHeight;
		for(var i=0;i<aImg.length;i++)
		{
			if(aImg[i].offsetTop<clientBottom)
			{
				var src=aImg[i].getAttribute('_src');
				aImg[i].src=src;	
			}	
		}
	};
	
	
	
	
	
	
	
	
	
	
};






























