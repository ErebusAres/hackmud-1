function(context, args)
{
	let k3ys = #fs.market.browse({name:"k3y_v2"});
	let k3ysStrings =[];
	for (let i of k3ys){
		let j = #fs.market.browse({i:i.i, full:true})
		if (!k3ysStrings.includes(j.upgrade.k3y)){
			k3ysStrings.push(j.upgrade.k3y)
		}
		if (Date.now()-_START > 4500) {
			return {msg:"timeout", k3ys:k3ysStrings};
		}
	}
	return {msg:"finish", k3ys:k3ysStrings};
}