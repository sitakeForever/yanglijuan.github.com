// JavaScript Document
var aLi=document.getElementsByTagName('li');
	var zIndex=1;
	//li上的透明层
	for(var i=0;i<aLi.length;i++)
	{
		var oSpan=document.createElement('span');
		oSpan.innerHTML=i;
		aLi[i].appendChild(oSpan);	
	}
	//布局转换
	var aPos=[];
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
					move(obj,aPos[oNear.index]);
					move(oNear,aPos[obj.index]);
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
					move(obj,aPos[obj.index]);	
				}	
			};
			return false;	
		};	
	}
	
	
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