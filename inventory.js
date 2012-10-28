function Unit(name,stamina,intellect,strength,agility,one,two,three){
	var name = name
	var health = 0
	var manapool = 0
	this.slotone = one
	this.slottwo = two
	this.slotthree = three
	this.gcd = 0.7
	this.head = null
	this.weapon = null

	this.constructor = function(){ health = stamina*10 ; manapool = intellect*10 }
	this.hit = function(){ return Math.floor(Math.random()*strength) }
	this.damage = function(hit){ health = health - hit; return hit }
	this.current_health = function(){ return health }
	this.current_manapool = function(){ return manapool }
	this.return_name = function(){ return name }
}