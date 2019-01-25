function(context, args)
{
	if (!args){
		return "This will delete everything that it deems worthless, so there is no risk involved in the use of this script whatsoever.\n`Nname`:`V\"string\"` deletes all items containing the string in its name\nEnjoy!"
	}
	var u = #3s.sys.upgrades({full:true}), a=[], k3ys = []

	if (args.name) {
		for (let i of u){
			if(i.name.includes(args.name)){
				if (!i.loaded){
					a.push(i.i)
				}
			}
		}
	} else {
		for (let i of u){
			if((i.tier == 1 && i.rarity < 2) || (i.tier == 2 && i.rarity < 2 && !/char_count|script_slot|bot/.test(i.type)))
			{
				if (!i.loaded && !i.name.includes("k3y"))
				{
					a.push(i.i)
				}
			}
		}
		for (let i of u)
		{
			if (i.name.includes("k3y"))
			{
				if (!k3ys.includes(i.k3y))
				{
					k3ys.push(i.k3y)
				} else {
					a.push(i.i)
				}
			}
		}
	}
	if (a.length) {
		if (args.confirm) {
			#1s.sys.cull({i:a, confirm:true})
			return {msg:`Deleted items: ${a.join(', ')}`, k3ys:k3ys}
		} else {
			return {msg:`confirm:true to delete items: ${a.join(', ')}`, k3ys:k3ys}
		}
	} else {
		return {msg:`No worthless items found.`, k3ys:k3ys}
	}
}
