function battlelog(who, what, whom, dmg, that){
	if( who == whom ){
		$("#console_log").html('<span class="player">'+who+'</span> used '+what+' on <span class="player">self</span> gaining <b>'+dmg+'</b>' + '<br />' + $("#console_log").html())
	}else{
		$("#console_log").html('<span class="player">'+who+'</span> used '+what+' on <span class="enemy">'+whom+'</span> for <b>'+dmg+'</b> damage' + '<br />' + $("#console_log").html())
	}
}

function checkifstillalive(){
		if( player.current_health() <= 0 ){ $('#game').html('YOU DIED! <a href="javascript:location.reload();">Try Again</a>')
		}else if( enemy.current_health() <= 0 ){ $('#game').html('YOU WON! <a href="javascript:location.reload();">Try Again</a>')
		}else{ return true }
}

function setupScreen(){
	$('#slotone').val(player.slotone.name)
	$('#slottwo').val(player.slottwo.name)
	$('#slotthree').val(player.slotthree.name)
	displayInfo()
}

function displayInfo(){
	checkifstillalive()
	$('#playerhp').text(player.current_health())
	$('#playermana').text(player.current_manapool())
	$('#enemyhp').text(enemy.current_health())
	$('#enemymana').text(enemy.current_manapool())
}