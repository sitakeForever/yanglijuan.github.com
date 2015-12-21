// JavaScript Document

//头部
$(function(){
	//$('.down')
	//向下滚动(第一屏到第二屏)
	
	var oWork=document.getElementById('work');
	
	var toBig=document.getElementById('tobig');
	var nTop=toBig.offsetTop;
	
	var bShow=true;
	var oCard=document.getElementById('_card');   //选项卡
	var bStart=true;
	
	var aJumpDiv=document.getElementById('jump-box').children;  //弹性运动
	var bJump=true;
	
	var oUp=document.getElementById('up');  //回到顶部
	var userScroll=false;
	var upTimer=null;
	
	var oDown=document.getElementById('down');  //向下箭头
	
	var oHeader1=document.getElementById('header1');  //首屏标题
	var aNav=getByClass(oHeader1,'scroll');

	aNav[1].onclick=function(){
		toScroll(700,1000);	
	};
	aNav[2].onclick=function(){
		toScroll(2800,2000);	
	};
	
	oDown.onclick=function(){
		var oScrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		toScroll(oScrollTop+700,1000);		
	};
	oUp.onclick=function(){
		moveScroll(0,3000);	
	};
	window.onscroll=function(){
		
		var oScrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		//document.title=oScrollTop;    //测试
		
		//淡入淡出+向上=向上飘入（第一部分个人作品）
		if(oScrollTop>=450)
		{
			move(oWork,{opacity:1,top:0},{duration:800});	
		}
		
		//萌宠
		if(bShow&&oScrollTop>=1000)
		{
			move(toBig,{top:nTop-80},{easing:Tween.Bounce.easeIn,duration:200,complete:function(){
					move(toBig,{top:nTop},{easing:Tween.Bounce.easeOut,duration:300,duration:bShow=false})		
			}});	
		}
		
		//
		if(bStart&&oScrollTop>=1600)
		{
			start();
			bStart=false;	
		}
		
		if(bJump&&oScrollTop>=2400)
		{
			jump();
			bJump=false;	
		}
		
		if(oScrollTop>700)
		{
			oUp.style.display='block';	
		}else
		{
			oUp.style.display='none';	
		}
		
		if(oScrollTop>2900)
		{
			oDown.style.display='none';	
			show();
		}else
		{
			oDown.style.display='block';	
		}
		
		if (userScroll)
		{
			// 用户滚动了
			clearInterval(upTimer);
		}
		userScroll=true;
	
	}
	
	
	//拉勾网效果
	
		var aLi=oWork.getElementsByTagName('li');
		for(var i=0;i<aLi.length;i++)
		{
			enter(aLi[i]);
			leave(aLi[i]);	
		}
	//网页作品跳转
	;(function(){
		var aLi=oWork.getElementsByTagName('li');
		var arr=['otherWeb/aiqiyi/index.html','otherWeb/soul/index.html','otherWeb/OPPO/index.html','otherWeb/taobao/index.html','otherWeb/360/index.html','otherWeb/meituan/index.html','otherWeb/carTrade/index.html','otherWeb/jd/index.html'];
		for(var i=0;i<aLi.length;i++)
		{
			(function(index){
				aLi[i].onclick=function(){
					window.open(arr[index],'_block');
				};
			})(i);	
		}
	})();	
		
		
	//照片墙
	;(function(){
		
		var aLi=toBig.getElementsByTagName('li');
		var zIndex=1;
		var arrName=['干嘛强吻我...','看我萌不萌...','真好吃...','绅士如我','必须酷酷的!!','我的职责就是保护你','快，来个特写☺','白龙马就是我','看你看你就看你'];
		//li上的透明层
		var aSpan=[];
		for(var i=0;i<aLi.length;i++)
		{
			var oSpan=document.createElement('span');
			oSpan.innerHTML=arrName[i];
			aLi[i].appendChild(oSpan);
			aSpan.push(oSpan);	
		}
		
		//透明层运动
		$(aLi).hover(function(){
			
			$(aSpan).eq($(this).index()).stop().animate({bottom:0});
				
		},function(){
			$(aSpan).eq($(this).index()).stop().animate({bottom:-30});	
		});
		
		//布局转换
		var aPos=[];
		
		toBig.style.left=toBig.offsetLeft+'px';
		toBig.style.top=toBig.offsetTop+'px';
		toBig.style.position='absolute';
		for(var i=0;i<aLi.length;i++)
		{
			var left=aLi[i].offsetLeft;
			var top=aLi[i].offsetTop;
			aPos.push({left:left,top:top});
			aLi[i].style.left=left+'px';
			aLi[i].style.top=top+'px';		
		}
		for(var i=0;i<aLi.length;i++)
		{
			aLi[i].index=i;  //设置各自的下标----用index自定义属性
			aLi[i].style.position='absolute';
			aLi[i].style.margin='0';	
		}
		
		for(var i=0;i<aLi.length;i++)
		{
			drag(aLi[i]);	
		}
		
		function drag(obj)
		{
			obj.onmousedown=function(ev){
				var oNear=null;
				obj.style.zIndex=zIndex++;   //用后加
				var oEvent=ev||event;
				var disX=oEvent.clientX-obj.offsetLeft;
				var disY=oEvent.clientY-obj.offsetTop;
				document.onmousemove=function(ev){
					var oEvent=ev||event;
					var left=oEvent.clientX-disX;
					var top=oEvent.clientY-disY;
					
					obj.style.left=left+'px';
					obj.style.top=top+'px';	
					
					//找最近
					oNear=findNear(obj);
					if(oNear)
					{
						for(var i=0;i<aLi.length;i++)
						{
							aLi[i].className='';		
						}
						oNear.className='active';
					}else
					{
						for(var i=0;i<aLi.length;i++)
						{
							aLi[i].className='';		
						}	
					}
					
					
				}
				document.onmouseup=function(){
					document.onmousemove=null;
					document.onmouseup=null;
					//换位子
					if(oNear)
					{
						//找到最近的一个换位子
						move(obj,aPos[oNear.index],{easing:Tween.Bounce.easeOut});
						move(oNear,aPos[obj.index],{easing:Tween.Bounce.easeOut});
						//换下标
						var nTmp=oNear.index;
						oNear.index=obj.index;
						obj.index=nTmp;
						for(var i=0;i<aLi.length;i++)
						{
							aLi[i].className='';	
						}	
					}else
					{
						//没有最近  回到自己的位置
						move(obj,aPos[obj.index],{easing:Tween.Bounce.easeOut});	
					}	
				};
				return false;	
			};	
		}
		
		//选项卡
		
		;(function(){
			
			var aBtn=oCard.getElementsByTagName('ul')[1].children;
			var oList=oCard.getElementsByTagName('ul')[0];
			var w1=oList.children[0].offsetWidth;
			var total=5;
			var n=0;  //当前下标
			var m=0;
			
			//
			oList.innerHTML+=oList.innerHTML;
			oList.style.width=oList.offsetWidth*2+'px';
			//
			/*for(var i=0;i<aBtn.length;i++)
			{
				(function(index){
					aBtn[i].onmouseover=function(){
						n=index;
						tick();
					};	
				})(i);
			}*/
			
			//向右
			var oR=getByClass(oCard,'right')[0];
			oR.onclick=function(){
				n++;
				m++;
				var left=oList.offsetLeft;
				if(left<=-oList.offsetWidth/2)
				{
					left=0;	
					oList.style.left=left+'px';
				}
				if(n>=total)
				{
					n=0;		
				}
				if(m>=total+1)
				{
					m=1;		
				}
				
				tick();	
			};
			
			//向左
			var oL=getByClass(oCard,'left')[0];
			oL.onclick=function(){
				n--;
				m--;
				if(n==-1)
				{
					n=total-1;	
				}
				if(m==-1)
				{
					m=total-1;		
				}
				var left=oList.offsetLeft;
				if(left>=0)
				{
					left=-oList.offsetWidth/2;
					oList.style.left=left+'px';	
				}	
				tick();	
			};
			
			//轮播
			
				clearInterval(timer);
				var timer=setInterval(function(){
					n++;
					m++;
					var left=oList.offsetLeft;
					if(left<=-oList.offsetWidth/2)
					{
						left=0;	
						oList.style.left=left+'px';
					}
					if(n>=total)
					{
						n=0;		
					}
					if(m>=total+1)
					{
						m=1;		
					}
					
					tick();
					
							
				},3000);
				
				//移入停止
				oCard.onmouseover=function(){
					oL.style.display='block';
					oR.style.display='block';
					clearInterval(timer);	
				};
				
				//移出继续
				oCard.onmouseout=function(){
					oL.style.display='none';
					oR.style.display='none';
					timer=setInterval(function(){
						n++;
						m++;
						var left=oList.offsetLeft;
						if(left<=-oList.offsetWidth/2)
						{
							left=0;	
							oList.style.left=left+'px';
						}
						if(n>=total)
						{
							n=0;		
						}
						if(m>=total+1)
						{
							m=1;		
						}
						
						tick();		
					},3000);	
				};	
			
			
			
			
			function tick()
			{
				
				for(var i=0;i<aBtn.length;i++)
				{
					aBtn[i].className='';	
				}
				aBtn[n].className='active';
				//oList.style.left=-index*w+'px';
				move(oList,{left:-m*w1},{duration:500});		
			}
			
			/*//分块运动
			
			
			win.start=function()
			{
				
				
			}*/
			
		})();
		
		
		
		function collTest(obj1,obj2)
		{
			//obj1
			var l1=obj1.offsetLeft;
			var r1=l1+obj1.offsetWidth;
			var t1=obj1.offsetTop;
			var b1=t1+obj1.offsetHeight;
			//obj2
			var l2=obj2.offsetLeft;
			var r2=l2+obj2.offsetWidth;
			var t2=obj2.offsetTop;
			var b2=t2+obj2.offsetHeight;
			if(r1<l2||b1<t2||l1>r2||t1>b2)
			{
				return false;
			}else
			{
				return true;	
			}	
		}
		
		function findNear(obj)
		{
			var nMin=9999999;
			var nMinIndex=-1;
			//碰撞检测  在碰上的里面找最小
			for(var i=0;i<aLi.length;i++)
			{
				if(obj!=aLi[i])  //不是自己
				{
					if(collTest(obj,aLi[i]))
					{
						//碰上了
						var dis=getDis(obj,aLi[i]);
						if(dis<nMin)
						{
							nMin=dis;
							nMinIndex=i;	
						}	
					}	
				}	
			}	
			
			if(nMinIndex==-1)
			{
				return null;	
			}else
			{
				return aLi[nMinIndex];	
			}	
		}
		
		function getDis(obj1,obj2)
		{
			var a=(obj1.offsetLeft+obj1.offsetWidth/2)-(obj2.offsetLeft+obj2.offsetWidth/2);
			var b=(obj1.offsetTop-obj1.offsetHeight/2)-(obj2.offsetTop-obj2.offsetHeight/2);
			var dis=Math.sqrt(a*a+b*b);
			return dis;
		}
	})();
	
	
	//弹性运动
	;(function(win){
		//布局转换
		var aPos=[];
		for(var i=0;i<aJumpDiv.length;i++)
		{
			var left=aJumpDiv[i].offsetLeft;
			var top=aJumpDiv[i].offsetTop;
			aJumpDiv[i].style.left=left+'px';
			aJumpDiv[i].style.top=top+'px';
			aPos.push({
				left:left,
				top:top	
			});
		}	
		for(var i=0;i<aJumpDiv.length;i++)
		{
			aJumpDiv[i].style.position='absolute';	
		}
		//初始化
		aJumpDiv[0].style.left=-aJumpDiv[0].offsetWidth*2+'px';
		aJumpDiv[2].style.left=aPos[2].left+aJumpDiv[0].offsetWidth*2+'px';
		
		//点击功能
		
			aJumpDiv[0].onclick=function(){
				window.open('resume.html','_black');	
			};
			aJumpDiv[1].onclick=function(){
				window.open('video.html','_black');	
			};		
			aJumpDiv[2].onclick=function(){
				window.open('resume.html','_black');	
			};
		
			
		win.jump=function(){
			for(var i=0;i<aJumpDiv.length;i++)
			{
				//aDiv[i].style.left=aPos[i].left+'px';	
				aJumpDiv[i].style.display='block';
				move(aJumpDiv[i],{left:aPos[i].left},{easing:Tween.Bounce.easeOut});
			}
			if(bJump)
			{
				//alert(1);
				move(aJumpDiv[1],{top:-100},{easing:Tween.Bounce.easeIn,duration:300,complete:function(){
					
					move(aJumpDiv[1],{top:0},{easing:Tween.Bounce.easeOut,duration:500,complete:function(){	
					bJump=false;	
				}});	
				}});
				
			}		
		};	
			
	})(window);
	//中心放大
	/*(function(){
		var toBig=document.getElementById('tobig');
		var aSpan=toBig.getElementsByTagName('img');
		var zIndex=10;
		for(var i=0;i<aSpan.length;i++)
		{
			aSpan[i].onmouseover=function(){
				zIndex++;
				this.style['z-index']=zIndex;
				move(this,{
					width:220,
					height:220,
					'margin-left':-35,
					'margin-top':-35,
					opacity:1	
				},{duration:400});	
			};
			
			aSpan[i].onmouseout=function(){
				move(this,{
					width:150,
					height:150,
					'z-index':0,
					'margin-left':0,
					'margin-top':0,
					opacity:0.4
				},{duration:400});	
			};	
		}
	})();*/
	
	//
	function enter(obj)
	{
		obj.onmouseenter=function(ev){
			var oSpan=obj.getElementsByTagName('span')[0];
			var oEvent=ev||event;
			var n=getN(obj, oEvent);
			//document.title=n;
			
			switch(n)
			{
				case 0:  //right
					oSpan.style.left=obj.offsetWidth+'px';
					oSpan.style.top=0;
					move(oSpan,{left:0},{duration:500});
					break;
				case 1:  //bottom
					oSpan.style.left=0;
					oSpan.style.top=obj.offsetHeight+'px';
					move(oSpan,{top:0},{duration:500});
					break;
				case 2:  //left
					oSpan.style.left=-obj.offsetWidth+'px';
					oSpan.style.top=0;
					move(oSpan,{left:0},{duration:500});
					break;
				case 3:  //top
					oSpan.style.left=0;
					oSpan.style.top=-obj.offsetHeight+'px';
					move(oSpan,{top:0},{duration:500});
					break;	
			}	
		};	
	}
	
	function leave(obj)
	{
		obj.onmouseleave=function(ev){
			var oSpan=obj.getElementsByTagName('span')[0];
			var oEvent=ev||event;
			var n=getN(obj, oEvent);
			//document.title=n;
			
			switch(n)
			{
				case 0:  //right
					move(oSpan,{left:240,top:0},{duration:500});
					break;
				case 1:  //bottom
					move(oSpan,{left:0,top:240},{duration:500});
					break;
				case 2:  //left
					move(oSpan,{left:-240,top:0},{duration:500});
					break;
				case 3:  //top
					move(oSpan,{top:-240,left:0},{duration:500});
					break;	
			}	
		};	
	}
	
	
	function toScroll(target,time)
	{
		var start=document.documentElement.scrollTop||document.body.scrollTop;  //初始值
		var dis=target-start;
		var count=Math.floor(time/30);  //次数
		var n=0;
		var timer=null;
		//start+dis*n/count;
		clearInterval(timer);
		timer=setInterval(function(){
			n++;
			var cur=start+dis*n/count;
			
			document.body.scrollTop=cur;
			document.documentElement.scrollTop=cur;
			
			if(n==count)
			{
				clearInterval(timer);		
			}	
		},30);
			
	}
	
	
	function getN(obj, ev)   //算法有问题???????
	{
		var oScrollTop=document.documentElement.scrollTop||document.body.scrollTop;  //滚动高度
		var h=document.body.offsetHeight;  //页面高度
		var h2=document.documentElement.clientHeight*document.documentElement.clientHeight/h;
		//console.log(oScrollTop);
		var x=getPos(obj).left+obj.offsetWidth/2-ev.clientX;
		var y=getPos(obj).top-oScrollTop+obj.offsetHeight/2-ev.clientY;
		
		var n=Math.round((d2a(Math.atan2(y, x))+180)/90)%4;
		return n;
	}
	function d2a(d)
	{
		return d*180/Math.PI;
	}
	
	
	//选项卡图片加载
		function start()
		{
			var oTit=document.getElementById('card-tit');
			var oImg=oTit.getElementsByTagName('img')[0];
			
			var R=1;
			var C=20;
			var nWidth=1263;
			var nHeight=140;
			var w=nWidth/C;
			var h=nHeight/R;
			var aI=[];
			for(var r=0;r<R;r++)
			{
				for(var c=0;c<C;c++)
				{
					var oI=document.createElement('i');
					oI.style.width=w+'px';
					oI.style.height=h+'px';
					var left=c*w;
					var top=r*h;
					oI.style.left=left+'px';
					oI.style.top=top+'px';
					oI.style.backgroundPosition=-left+'px '+(-top)+'px';
					
					aI.push(oI);
					oTit.appendChild(oI);	
				}	
			}
			
			var m=0;
			var timer=setInterval(function(){
				(function(index){
					move(aI[m],{opacity:1},{duration:300,complete:function(){
						if(index==aI.length-2)
						{
							clearInterval(timer);
							for(var i=0;i<aI.length;i++)
							{
								aI[i].style.display='none';	
							}
							oImg.style.display='block';	
						}	
					}});
				})(m);
				m++;	
			},300);	
		}
		
		
		function moveScroll(target, time)
		{
			var start=document.documentElement.scrollTop || document.body.scrollTop;
			var dis=target-start;
			var count=Math.floor(time/30);
			var n=0;
			
			clearInterval(upTimer);
			upTimer=setInterval(function (){
				userScroll=false;
				n++;	
				var cur=start+dis*n/count;
				// 先
				document.body.scrollTop=cur;
				document.documentElement.scrollTop=cur;
				
				if (n == count)
				{
					clearInterval(upTimer);
				}
			}, 30);
		}
	
	
	//首屏动画效果
	;(function(){
		var oCloud=$('#cloud');
		var oMoon=$('#moon');
		var oDown=$('#down')
		oCloud.stop().animate({left:0,opacity:1},{duration:2000,complete:function(){
				oMoon.stop().animate({opacity:1},{duration:3000});
				oDown.stop().animate({opacity:1},{duration:2500});	
		}});
		
	})();
	
	;(function(win){
		var oFooter=document.getElementById('footer');
		var oSpan1=oFooter.getElementsByTagName('span')[0];
		var str='©2015-    羊羊羊 版权所有（京xxx备）';
		var aSpan=[];
		var timer=null;	
		for(var i=0;i<str.length;i++)
		{
			var oSpan=document.createElement('span');
			oSpan.innerHTML=str.charAt(i);
			aSpan.push(oSpan);
			oFooter.appendChild(oSpan);
		}
		aSpan.push(oSpan1);
		win.show=function(){
			//alert(1);
			var n=-1;
			timer=setInterval(function(){
				n++;
				move(aSpan[n],{opacity:1});
				if(n==aSpan.length-1)
				{//alert(1)
					clearInterval(timer);	
				}	
			},30);		
		}
	})(window);
	
		//win.show();
	
	
	
	
	
	
	
	
	
	
	
	
});

    function getPos(obj)       //（获得到页面左和到页面顶部的距离）
        {
            var left=0;
            var top=0;
            while(obj)
            {
                left+=obj.offsetLeft;
                top+=obj.offsetTop;
                obj=obj.offsetParent;        
            }
            return {left:left,top:top};    
        }