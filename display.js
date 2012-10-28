function battlelog(who, what, whom, dmg, that){
	if( whom == player.return_name() && who == whom ){ whom = '<span class="player">self</span>'
	}else if( whom == player.return_name() ){ whom = '<span class="player">'+whom+'</span>'
	}else{ whom = '<span class="enemy">'+whom+'</span>' }

	if(who == player.return_name()){ who = '<span class="player">'+who+'</span>'
	}else{ who = '<span class="enemy">'+who+'</span>' }

	$("#console_log").html(who+' used '+what+' on '+whom+' gaining <b>'+dmg+'</b>' + '<br />' + $("#console_log").html())
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
	doCooldownDisables()
}
