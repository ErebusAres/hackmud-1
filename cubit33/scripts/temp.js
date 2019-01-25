function(context, args)
{

	var caller = context.caller
	var lib = #fs.scripts.lib()
	let response, response2, crp = /`.[¡¢Á¤Ã¦§¨©ª]`/g, join=false, kv={navigation:"news"}

	response = #fs.cyberdine.public(kv)
	response2= #fs.cyberdine.public(kv)
	if (typeof response == "object")
	{
		response = response.join("\n").replace(crp,"§")
		response2=response2.join("\n").replace(crp,"§")
		join=true
	}
	else
	{
		response = response.replace(crp,"§")
		response2=response2.replace(crp,"§")
	}
	
	while (true)
	{
		
		let corIndex = response.indexOf("§")
		if (corIndex == -1)
		{
			return response
		}
		
		let r2char = response2.substr(corIndex,1)
		if (r2char == "§")
		{
			if (join)
			{
				response2 = #fs.cyberdine.public(kv).join("\n").replace(crp,"§")
			}
			else
			{
				response2 = #fs.cyberdine.public(kv).replace(crp,"§")
			}
			continue
		}
		
		response = replaceAt(response,corIndex,r2char)
	}
	function replaceAt(string, index, replacement)
	{
		return string.substr(0, index) + replacement+ string.substr(index + replacement.length);
	}

}