function Skills(name,dmg,buff,timer,cd,target){
	this.name = name
	this.dmg = dmg
	this.buff = buff
	this.timer = timer
	this.cd = cd
	this.target = target

	this.return_name = function(){ return this.name }
	this.use_buff = function(){  }
}

function createSkills(){
	this.rake = new Skills("Scratch", 1.2, 0, 0, 2, "enemy")
	this.agibuff = new Skills("Agility Buff", 0, "Agility+10", 30, 0, "self")
	this.def = new Skills("Defensive Pose", 0, "Strength+10", 30, 0, "self")
}

function disableActionButton(slot){
	doGlobalCoolDown()
	$("#"+slot).attr("disabled","disabled")
	var action = player[slot]
	var slotname = action.name
	cd[slotname] = action.cd*1000
	cdi[slot] = setInterval(function(){
		cd[slotname] = cd[slotname] - 10
		$("#"+slot).val(cd[slotname]/1000+"s").css("color","red");
	},10)
	if( action.target == "self"){
		battlelog(player.return_name(), action.name, player.return_name(), 10)
	}else{
		battlelog(player.return_name(), action.name, enemy.return_name(), 10)
	}
	setTimeout(function(){
		window.clearInterval(cdi[slot])
		$("#"+slot).removeAttr("disabled").css("color","black").val(action.name);
	}, action.cd*1000)	
}

function doGlobalCoolDown(time){
	$('input.skill').attr("disabled","disabled")
	setTimeout(function(){
		$('input.skill').removeAttr("disabled");
	}, player.gcd*1000)	

}