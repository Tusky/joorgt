function Unit(name,stamina,intellect,strength,agility,one,two,three){
	var name = name
	var health = 0
	var manapool = 0
	this.slotone = one
	this.slottwo = two
	this.slotthree = three

	this.constructor = function(){ health = stamina*10 ; manapool = intellect*10 }
	this.hit = function(){ return Math.floor(Math.random()*strength) }
	this.damage = function(hit){ health = health - hit; return hit }
	this.current_health = function(){ return health }
	this.current_manapool = function(){ return manapool }
	this.return_name = function(){ return name }
}

function Skills(name,dmg,buff,timer,gcd,target){
	this.name = name
	this.dmg = dmg
	this.buff = buff
	this.timer = timer
	this.gcd = gcd
	this.target = target

	this.return_name = function(){ return this.name }
	this.use_buff = function(){  }
}

function createSkills(){
	this.rake = new Skills("Scratch", 1.2, 0, 0, 2, "enemy")
	this.agibuff = new Skills("Agility Buff", 0, "Agility+10", 30, 0, "self")
	this.def = new Skills("Defensive Pose", 0, "Strength+10", 30, 0, "self")
}

$().ready(function(){
	cd=gcd=[]
	var start = new Date;
	skills = createSkills()
	player = new Unit("Player",14,12,15,14,rake,agibuff,def)
	player.constructor()
	enemy = new Unit("Enemy",8,11,10,13)
	enemy.constructor()

	setupScreen()
	setInterval(function() {
		displayInfo()
	}, 100);


	$('#slotone').click(function(){
		disableActionButton("slotone")
		return false
	})
	$('#slottwo').click(function(){
		disableActionButton("slottwo")
		return false
	})
	$('#slotthree').click(function(){
		disableActionButton("slotthree")
		return false
	})
})

function disableActionButton(slot){
	$("#"+slot).attr("disabled","disabled")
	var action = player[slot]
	var slotname = action.name
	gcd[slotname] = action.gcd*1000
	cd[slot] = setInterval(function(){
		gcd[slotname] = gcd[slotname] - 10
		$("#"+slot).val(gcd[slotname]+"ms").css("color","red");
	},10)
	if( action.target == "self"){
		battlelog(player.return_name(), action.name, player.return_name(), 10)
	}else{
		battlelog(player.return_name(), action.name, enemy.return_name(), 10)
	}
	setTimeout(function(){
		window.clearInterval(cd[slot])
		$("#"+slot).removeAttr("disabled").css("color","black").val(action.name);
	}, action.gcd*1000)	
}

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