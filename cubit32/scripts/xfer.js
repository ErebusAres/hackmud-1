function(context, args)
{
	var caller = context.caller;
	if (!!/cubit3[345]/.exec(caller))
	{
		if (!args)
		{
			return "amount:<number or GC string> must be included. This script only works for user cubit33."
		}
		let msg = #hs.accts.balance();
		#fs.chats.tell({to:caller, msg:msg})
		return #fs.accts.xfer_gc_to_caller({amount:args.amount});
	}
	else
	{
		return { msg:"You are not an approved user of this script" };
	}

}
