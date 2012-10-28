function Skills(name,dmg,buff,timer,cd,target,img){
	this.name = name
	this.dmg = dmg
	this.buff = buff
	this.timer = timer
	this.cd = cd
	this.target = target
	this.imageurl = img

	this.return_name = function(){ return this.name }
	this.use_buff = function(){  }
}

function createSkills(){
	this.rake = new Skills("Scratch", 1.2, 0, 0, 2, "enemy", "scratch.png")
	this.agibuff = new Skills("Agility Buff", 0, "Agility+10", 30, 0, "self", "agibuff.png")
	this.def = new Skills("Defensive Pose", 0, "Strength+10", 30, 0, "self", "defensivepose.png")
}

function disableActionButton(slot){
	doGlobalCoolDown()
	var action = player[slot]
	var slotname = action.name
	cd[slotname] = action.cd*1000
	cdi[slot] = setInterval(function(){
		cd[slotname] = cd[slotname] - 10
		$("#"+slot).val(cd[slotname]/1000+"s").addClass('on_cooldown').css("color","red");
	},10)
	if( action.target == "self"){
		battlelog(player.return_name(), action.name, player.return_name(), 10)
	}else{
		battlelog(player.return_name(), action.name, enemy.return_name(), 10)
	}
	setTimeout(function(){
		window.clearInterval(cdi[slot])
		$("#"+slot).removeClass('on_cooldown').css("color","black").val(' ');
	}, action.cd*1000)
}

function doGlobalCoolDown(time){
	$('input.skill').addClass('on_gcd')
	setTimeout(function(){
		$('input.skill').removeClass('on_gcd')
	},player.gcd*1000)
}

function doCooldownDisables(){
	$('.on_cooldown').attr('disabled', 'disabled')
	$('.on_gcd').attr('disabled', 'disabled')
	$('.skill').not('.on_cooldown').not('.on_gcd').removeAttr("disabled")
}