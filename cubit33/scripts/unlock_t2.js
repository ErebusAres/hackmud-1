function(context, args)
{
	// var caller = context.caller
	// var l = #fs.scripts.lib()
	if (!args) {return "Input a target with target:#s.npc.loc\nreport:true to receive detailed feedback"}
	let
	kv = {},
	rsp, lastrsp,
	lock,
	ez = ["open","release","unlock"],
	colors = "red,orange,yellow,lime,green,cyan,blue,purple".split(','),
	n1 = "is not the",
	l0cket = "cmppiq,sa23uw,tvfkyq,uphlaw,vc2c7q,xwz7ja,i874y3,72umy0,5c7e1r,hc3b69,nfijix,4jitu5,6hh8xw".split(','),
	debug = [],
	times = {},
	report = {},
	l0ckboxK3ys = [],
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
			report["msg"] = "error, target does not exist"
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
				guesses = [], guess, error=true
				while (Date.now()-_START < 4500)
				{
					
					let last4copy = Array(...last4)
					guess = []
					while (last4copy.length)
					{
						let copy = last4copy.splice(Math.floor(Math.random()*last4copy.length),1)
						guess.push(copy)
					}
					guess = guess.join("")
					if (guesses.indexOf(guess) == -1)
					{
						guesses.push(guess)
						kv["magnara"] = guess
						rspC()
						if (!rspI("recinroct magnara ulotno"))
						{
							error=false
							break
						}
					}
				}
				report["magnara_guesses"] = guessess.length
				if (error)
				{
					report["msg"] = "error, unknown magnara answer"
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
								report["acct_nt"] = {tx:temp}
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
					
					let notTxMid=[], txMid = [], txLeadLen = 0
					txs.forEach(e => {
						if (e.time==ts[2])txLeadLen++
						if(e.time==ts[1] || e.time==ts[2]){notTxMid.push(e)}
						else if (e.time>ts[1] && e.time<ts[2]){txMid.push(e)}
					})
					//#D({ntxm:notTxMid.length,t1:ts[1],t2:ts[2],txLeadLen:txLeadLen})
					
					let midSum = 0; for (let i of txMid) midSum+=i.amount
					let count = 0, count2 = 0, guesses = [], error=true
					while (Date.now()-_START<4500)
					{
						let sum = midSum, end=false, newNotMid = notTxMid.slice(count);
						if (newNotMid.length) {sum += newNotMid.reduce((a,o) => { return a + o.amount },0)}
						
						while (newNotMid.length-txLeadLen>=0)
						{
							if (!/What was/.test(rsp)) sum = Math.abs(sum)
							if (guesses.indexOf(sum) == -1)
							{
								guesses.push(sum)
								kv["acct_nt"] = sum
								rspC()
								// #D({c:count,query:kv["acct_nt"],ms:Date.now()-_START})
								// #D({s:sum,c:count,rsp:rsp.substr(-25,25),time:Date.now()-_START})
								if (!/(total (spent|earned)|What was th)/.test(rsp))
								{
									//#D({success:"acct_nt"})
									report["acct_nt"] = {count,guesses,ts}
									error=false, end=true
									break
								}
							}
							sum-=newNotMid.pop().amount
						}
						if (end) break
						
						count++
						if (count > notTxMid.length)
						{
							report["error"] = "could not find the correct amount for `Nacct_nt`"
							report["acct_nt"] = {guesses,ts,newNotMid}
							//#D({error:"acct_nt",midsum:midSum,count:count,rsp:rsp})
							//#D(guesses)
							break
						}
					}
					if (error) break
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
					report["msg"] = "error, unknown lock argument"
					break
				}

			}
			else if(lock.includes("DATA_CHECK"))
			{

				kv["DATA_CHECK"] = ""
				let data_check = rspC().split("\n")
				if (data_check.length != 3)
				{
					report["msg"] = "error, DATA_CHECK error, less then 3 questions"
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
				report["msg"] = "error, l0ckbox requests absent key:"+reqK3y
				break
			}

		}
		else if (rspI("nection terminated.") || rspI("system offline"))
		{
			report["msg"] = "success!"
			report["success"] = true
			break
		}
		else if (rspI(n1)) //a lock argument is wrong, something went wrong in the unlocking process
		{
			report["msg"] = "error, wrong lock argument"
			break
		}
		else if (Date.now()-_START > 4500)
		{
			report["msg"] = "error, timeout"
			break
		}
		else if (rspI("breached")) //a lock argument is wrong, something went wrong in the unlocking process
		{
			report["msg"] = "error, target already breached!"
			break
		}
		else
		{
			report["msg"] = "error, rsp not recognized"
			break
		}

	}
	report["kv"] = kv
	report["rsp"] = rsp
	report["times"] = times
	report["ms"] = Date.now()-_START
	report["timestamp"] = Date.now()
	report["caller"] = caller

	if (args.report) return report

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