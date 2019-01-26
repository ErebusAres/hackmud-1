function(context, args)
{
	var caller = context.caller
	var l = #fs.scripts.lib()
	let infoString = "This is my toolbox, current options:\n\nKey Loader - `Nk3y`:`V\"string\"` - loads or unloads the first available key with that value, if available\n\nMarket Sort - market:true, name:\"string\", key:\"key\" (the referenced key must be numerical, ex. chars), rarity:\\d (rarity must be greater than 1) will return to you a list of those items sorted by the key:value\nTransactions - transactions:true to see a handy display of all your transactions",
	error = true

	if (!args)
	{
		return infoString
	}
	if (args.k3y)
	{
		let upgr = #hs.sys.upgrades({full:true})
		upgr.forEach(x => {
			if (x.k3y && x.k3y == args.k3y)
			{
				if (x.loaded){#ms.sys.manage({unload:x.i})} else #ms.sys.manage({load:x.i})
				error=false
			}
		})
		if (error) return "`DKey not found`"
		return "`2"+args.k3y+" found`"
	}
	else if (args.market&&args.name&&args.key&&args.rarity>1)
	{
		let kv = {name:args.name,rarity:args.rarity}
		let items = #fs.market.browse(kv)
		let temp = []
		while (items.length)
		{
			temp.push(items.pop().i)
		}
		kv = {i:temp,full:true}
		items = #fs.market.browse(kv).sort((a,b)=>(b.upgrade[args.key]-a.upgrade[args.key]))
		let string = ""
		items.forEach(i=>
		{
			string += `\`2${i.i}\` ${i.upgrade[args.key]} ${l.to_gc_str(i.cost)}\n`
		})
		return string
	}
	else if (args.transactions)
	{
		let txs = #hs.accts.transactions({count:50}), str=""
		txs.forEach(x=>
		{
			str+=`\n${l.to_game_timestr(x.time)} ${x.recipient==caller?"`N in`":"`Vout`"} ${pad(x.amount,15)} ${x.recipient!=caller?x.recipient:x.sender} \`V${!!x.memo?"MEMO":" "}\``
		})
		return str

		function pad(num, size)
		{
			var s = num+"";
			while (s.length < size) s = " " + s;
			return s;
		}
	}
	return infoString
}
