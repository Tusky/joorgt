function Person(name,hp,mana,str){
	this.name = name
	this.health = hp
	this.manapool = mana
	this.strength = str
	this.hit = function(){ return Math.floor(Math.random()*this.strength) }
	this.damage = function(hit){ this.health = this.health - hit; return hit }
}

$().ready(function(){
	player = new Person("Player",100,100,15)
	enemy = new Person("Enemy",80,100,20)
	displayInfo()

	$('#fight').click(function(){
		fight()
		return false
	})
})

function fight(){
	$("#console_log").html('<span class="player">Player</span> hit the <span class="enemy">Enemy</span> for <b>'+enemy.damage(player.hit())+'</b> damage' + '<br />' + $("#console_log").html())
	if( checkifstillalive() ){ $("#console_log").html('<span class="enemy">Enemy</span> hit the <span class="player">Player</span> for <b>'+player.damage(enemy.hit())+'</b> damage' + '<br />' + $("#console_log").html()) }
	if( checkifstillalive() ){ displayInfo() }
}

function checkifstillalive(){
		if( player.health <= 0 ){ $('#game').html('YOU DIED! <a href="javascript:location.reload();">Try Again</a>')
		}else if( enemy.health <= 0 ){ $('#game').html('YOU WON! <a href="javascript:location.reload();">Try Again</a>')
		}else{ return true }
}

function displayInfo(){
	$('#playerhp').text(player.health)
	$('#playermana').text(player.manapool)
	$('#enemyhp').text(enemy.health)
	$('#enemymana').text(enemy.manapool)
}