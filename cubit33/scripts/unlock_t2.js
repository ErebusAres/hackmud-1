function(context, args)
{
	if (!args) {return "Input a target with target:#s.npc.loc\nreport:true to receive detailed feedback"}
	let
	kv = {},
	rsp, lastrsp,
	lock,
	ez = ["open","release","unlock"],
	colors = "red,orange,yellow,lime,green,cyan,blue,purple".split(','),
	n1 = "is not the",
	l0cket = "cmppiq,sa23uw,tvfkyq,uphlaw,vc2c7q,xwz7ja,i874y3,72umy0,5c7e1r,hc3b69,nfijix,4jitu5,6hh8xw".split(','),
	times = {},
	rpt = {}, //rpt
	upgrades = #hs.sys.upgrades({full:true}),
	k3ys = [],
	caller = context.caller,
	lib = #fs.scripts.lib()
	
	for (let u of upgrades)
	{
		if (u.k3y)
		{
			k3ys.push(u)
			if (u.loaded)
			{
				#ms.sys.manage({unload:u.i})
			}
		}
	}
		
	rspC()

	let lastCycle = 0
	while (true)
	{
		if (!rsp)
		{
			rpt["msg"] = "error, target does not exist"
			break
		}
		if (rspI("chain your hardline"))
		{
			return rsp
		}
		
		if (lock && lock.length)
		{
			times[lock] = Date.now()-_START-lastCycle
		}
		lastCycle = Date.now()-_START
		if (!rspI("ion terminated.") || !rspI("system offline"))
		{
			rspC()
		}
		
		if (rspI("Denied acc")) // lock found
		{
			lock = /`N(\S*?)` lock\./.exec(rsp)[1]
			
			if (lock.includes("magnara"))
			{
				
				kv["magnara"] = ""
				rspC()
				let last4 = /\b\w+$/.exec(rsp)[0].split(""),
				gsses = [], gss, error=true // guesses and guess
				while (Date.now()-_START < 4500)
				{
					
					let last4copy = Array(...last4)
					gss = []
					while (last4copy.length)
					{
						let copy = last4copy.splice(Math.floor(Math.random()*last4copy.length),1)
						gss.push(copy)
					}
					gss = gss.join("")
					if (gsses.indexOf(gss) == -1)
					{
						gsses.push(gss)
						kv["magnara"] = gss
						rspC()
						if (!rspI("recinroct magnara ulotno"))
						{
							error=false
							break
						}
					}
				}
				rpt["magnara_gsses"] = gssess.length
				if (error)
				{
					rpt["msg"] = "error, unknown magnara answer"
					break
				}
				
			}
			else if (lock.includes("acct_nt"))
			{
				let txs = #hs.accts.transactions({count:25}).map(e => 
				{
					e["time"] = parseInt(lib.to_game_timestr(e.time).replace(".",""));
					(e.recipient==caller)?null:e["amount"]*=-1
					return e
				})
				kv["acct_nt"] = 0
				rspC()
				let rgx=/Get me the amount/
				
				if(rgx.test(rsp))
				{
					while (txs.length)
					{
						let temp = txs.shift()
						if (temp.recipient == caller)
						{
							kv["acct_nt"] = Math.abs(temp.amount)
							rspC()
							if (!rgx.test(rsp))
							{
								rpt["acct_nt"] = {tx:temp}
								break
							}
						} 
					}
				}
				else
				{
					let ts = /(\d+\.\d+)\D+(\d+\.\d+)/.exec(rsp) //timestamps
					ts[1] = parseInt(ts[1].replace(".",""))
					ts[2] = parseInt(ts[2].replace(".",""));
					if (!/ net `/.test(rsp)){/without/.test(rsp)?txs.filter(e=>!e.memo):txs.filter(e=>e.memo)} //remove transactions with or without memos if no net GC is asked
					
					let nTM=[], txMid = [], tLL = 0 //nTM = not transaction middle, tLL = transaction lead length
					txs.forEach(e => {
						if (e.time==ts[2])tLL++
						if(e.time==ts[1] || e.time==ts[2]){nTM.push(e)}
						else if (e.time>ts[1] && e.time<ts[2]){txMid.push(e)}
					})
					
					let midSum = 0; for (let i of txMid) midSum+=i.amount
					let count = 0, count2 = 0, gsses = [], error=true
					while (Date.now()-_START<4500)
					{
						let sum = midSum, end=false, nNM = nTM.slice(count) //nNM means new not mid
						if (nNM.length) {sum += nNM.reduce((a,o) => { return a + o.amount },0)}
						
						while (nNM.length-tLL>=0)
						{
							if (!/What was/.test(rsp)) sum = Math.abs(sum)
							if (gsses.indexOf(sum) == -1)
							{
								gsses.push(sum)
								kv["acct_nt"] = sum
								rspC()
								if (!/(total (spent|earned)|What was th)/.test(rsp))
								{
									rpt["acct_nt"] = {count,gsses,ts}
									error=false, end=true
									break
								}
							}
							sum-=nNM.pop().amount
						}
						if (end) break
						
						count++
						if (count > nTM.length)
						{
							rpt["error"] = "could not find the correct amount for `Nacct_nt`"
							rpt["acct_nt"] = {gsses,ts,nNM,rsp}
							break
						}
					}
					if (error) break
				}

			}
			else if (lock.includes("CON_SPEC"))
			{//con_spec only
				kv["CON_SPEC"] = ""
				rspC()
				let az = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), // a to z
				sq = /\w{3}(?=\n)/.exec(rsp)[0].split("").map(x=>az.indexOf(x)), // sequence
				nr = [sq[2]-sq[1],sq[1]-sq[0]]
				kv["CON_SPEC"] = 
					az[sq[2]+nr[1]]					+ 
					az[sq[2]+nr[1]  +nr[0]] +
					az[sq[2]+nr[1]*2+nr[0]]
				rspC()
				if (rspI("three letters"))
				{
					rpt["msg"] = "wrong CON_SPEC guess"
					break
				}
			}
			else if (lock.includes("EZ_"))
			{

				for (let i of ez)
				{
					kv[lock] = i
					if (!rspC().includes(n1))
					{
						break
					}
				}
				if (rspI("digit"))
				{
					ezDigit("digit")
				}
				else if (rspI("ez_prime"))
				{
					ezDigit("ez_prime")
				}

			}
			else if(lock.includes("c00"))
			{

				for (let i in colors)
				{
					let j = parseInt(i)
					kv[lock] = colors[i]
					if (lock == "c001")
					{
						kv["color_digit"] = kv["c001"].length
					}
					else if (lock == "c002")
					{
						kv["c002_complement"] = colors[(j+4)%8]
					}
					else if (lock == "c003")
					{
						kv["c003_triad_1"] = colors[(j+5)%8]
						kv["c003_triad_2"] = colors[(j+3)%8]
					}
					rspC()
					if (!rspI(n1))
					{
						break
					}
				}

			}
			else if(lock.includes("l0cket"))
			{

				let error = true
				for (let i of l0cket)
				{
					kv["l0cket"] = i
					if (!rspC().includes(n1))
					{
						error = false
						break
					}
				}
				if (error)
				{
					rpt["msg"] = "error, unknown lock argument"
					break
				}

			}
			else if(lock.includes("DATA_CHECK"))
			{

				kv["DATA_CHECK"] = ""
				let data_check = rspC().split("\n")
				if (data_check.length != 3)
				{
					rpt["msg"] = "error, DATA_CHECK error, less then 3 questions"
					break
				}
				let string = "";
				for (let i of data_check)
				{
					string += #fs.lore.data_check({lookup:i}).answer
				}
				kv["DATA_CHECK"] = string

			}
		}
		else if (rspI("To unlock, please load the appropriate k3y:"))
		{
			let reqK3y = /.{6}$/.exec(rsp)[0]
			let error = true
			for (let i of k3ys)
			{
				if (i.k3y == reqK3y)
				{
					error = false
					#ms.sys.manage({load:i.i})
					rspC()
					break
				}
			}
			if (error)
			{
				rpt["msg"] = "error, l0ckbox requests absent key:"+reqK3y
				break
			}
		}
		else if (rspI("nection terminated.") || rspI("system offline"))
		{
			rpt["msg"] = "success!"
			rpt["success"] = true
			break
		}
		else if (rspI(n1))
		{
			rpt["msg"] = "error, wrong lock argument"
			break
		}
		else if (Date.now()-_START > 4500)
		{
			rpt["msg"] = "error, timeout"
			break
		}
		else if (rspI("breached"))
		{
			rpt["msg"] = "error, target already breached!"
			break
		}
		else
		{
			rpt["msg"] = "error, rsp not recognized"
			break
		}

	}
	rpt["kv"] = kv
	rpt["rsp"] = rsp
	rpt["times"] = times
	rpt["ms"] = Date.now()-_START
	rpt["timestamp"] = Date.now()
	rpt["caller"] = caller

	if (args.report) return rpt

	function ezDigit(key){
		let digit = 0;
		if (key.includes("prime"))
		{
			digit = 1;
		}
		while (true)
		{
			kv[key] = digit++
			digit>9?digit++:null
			if (!rspC().includes(n1))
			{
				break
			}
		}
	}

	function rspC()
	{
		lastrsp = rsp
		rsp = args.target.call(kv)
		return rsp
	}

	function rspI(x)
	{
		return rsp.includes(x)
	}

}