$(function(){


  $('.paizi').addClass('diao');
   $(document).on('click',function(){
        $('.paizi').addClass('huiqu');
      })

    $('.paizi').on('click',function(){
        $('.cont').addClass('huilai');
   





	kongbai={};
	for(var i=0;i<15;i++){
		$('<b>').addClass('hang').appendTo('.qipan');
		for(var j=0;j<15;j++){
			kongbai[i+'-'+j]={x:i,y:j};
		$('<i>').addClass('shu').appendTo('.qipan')

			$('<div>').addClass('qizi')
			.attr('id',i+'-'+j)
			.data('pos',{x:i,y:j})
			.appendTo('.qipan')
		}
	}
		
    var join=function(n1,n2){
       return n1+'-'+n2;
    }
     
   var panduan=function(pos,biao){
       var h=1,s=1,zx=1,yx=1;
       var tx,ty;
       tx=pos.x; ty=pos.y;
       while(biao[join(tx,ty-1)]){
       	h++;ty--;
       }
       tx=pos.x; ty=pos.y;
       while(biao[join(tx,ty+1)]){
       	h++;ty++;
       }

       tx=pos.x; ty=pos.y;
       while(biao[join(tx-1,ty)]){
       	s++;tx--;
       }
       tx=pos.x; ty=pos.y;
       while(biao[join(tx+1,ty)]){
       	s++;tx++;
       }

       tx=pos.x; ty=pos.y;
       while(biao[join(tx-1,ty+1)]){
       	zx++;tx--;ty++;
       }
       tx=pos.x; ty=pos.y;
       while(biao[join(tx+1,ty-1)]){
       	zx++;tx++;;ty--;
       }

       tx=pos.x; ty=pos.y;
       while(biao[join(tx-1,ty-1)]){
       	yx++;tx--;ty--;
       }
       tx=pos.x; ty=pos.y;
       while(biao[join(tx+1,ty+1)]){
       	yx++;tx++;;ty++;
       }
       return Math.max(h,s,zx,yx);
    }

    var kaiguan=true;
    hei={};
    bai={};
    var isAi=true;

    var ai=function(){
    	var zuobiao;
    	var max=-Infinity;
    	for(var i in kongbai){
    		var weixie=panduan(kongbai[i],hei);
    		if(weixie>max){
    			max=weixie;
    			zuobiao=kongbai[i];
    		}
    	}
    	var zuobiao2;
    	var max2=-Infinity;
    	for(var i in kongbai){
    		var weixie=panduan(kongbai[i],bai);
    		if(weixie>max2){
    			max2=weixie;
    			zuobiao2=kongbai[i];
    		}
    	}
    	return (max>max2)?zuobiao:zuobiao2;
    }
 
    $('.qizi').on('click',function(){
		if($(this).hasClass('hei')||$(this).hasClass('bai')){
			return;
		}
       var pos=$(this).data('pos');
       if(kaiguan){
       	$(this).addClass('hei');
       	hei[pos.x+'-'+pos.y]=true;
       	delete kongbai[join(pos.x,pos.y)];
       	if(panduan(pos,hei)>=5){
       		console.log('hei ying');
       		$('.qipan .qizi').off('click');
       	}
       	if(isAi){
       		var pos=ai();
       		$('#'+join(pos.x,pos.y)).addClass('bai');
       		bai[join(pos.x,pos.y)]=true;
       		delete kongbai[join(pos.x,pos.y)];
       		
       		return;
       	}
       }else{
       	 $(this).addClass('bai');
       	 bai[pos.x+'-'+pos.y]=true;
       	 if(panduan(pos,bai)>=5){
       			console.log('bai ying');
       		$('.qipan .qizi').off('click');
       		}
       }
       kaiguan=!kaiguan;
   });
	
})
   })