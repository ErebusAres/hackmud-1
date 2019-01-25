function(context, args)
{
	let accLvl = #fs.scripts.get_level({name:args.name});
	return accLvl
	if (accLvl == 4) {
		args.name.call()
	}
}
