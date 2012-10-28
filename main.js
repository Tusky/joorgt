$().ready(function(){
	cdi=cd=[]
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