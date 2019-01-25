function(context, args)
{
    var caller = context.caller;
    var l = #fs.scripts.lib();


            // CONSTANTS
    var _k3yList = #hs.sys.upgrades({filter:{type:"tool"}})
    var _k3y = []
    var _surplusCount = {}
    var _surplus = []
    var _stashUser = "cubit32"

            // K3YS IN INVENTORY
    for (var j = 0; j < _k3yList.length; ++j)
    {
        _k3y.push(#hs.sys.upgrades({i:_k3yList[j].i}))
    }


            // SURPLUS K3Y LISTER
    for (var j = 0; j < _k3y.length; ++j)
    {
        if (_surplusCount[_k3y[j].k3y])
        {
            _surplusCount[_k3y[j].k3y]++
            _surplus.push(_k3y[j].i)
        }
        else
        {
            _surplusCount[_k3y[j].k3y] = 1
        }
    }
        if (caller == "YOUR USER")
    {
                // INFO
        if (!args)
        {
            return "\n\n`AK3YRING FUNCTIONS`\n\n`Llist`    - list k3ys in inventory\n`Lk3y`     - load a specific k3y\n`Lstash`   - stash your k3ys\n`Lsurplus` - stash only surplus k3ys"
        }

                // K3Y LISTER
        if (args.list)
        {
            return _k3y.map(o=>"`AINDEX:` `V" + o.i + "` `A---  KEY:` `N" + o.k3y + "`")
        }

                // K3Y LOADER
        if (args.k3y)
        {
            var _k3ySelect = #hs.sys.upgrades({filter:{k3y:args.k3y}})
            if (_k3ySelect[0])
            {
                #ms.sys.manage({unload:0})
                #ms.sys.manage({reorder:{from:_k3ySelect[0].i,to:0}})
                #ms.sys.manage({load:0})
                return "`AKey '``D" + args.k3y + "``A' loaded.`"
            }
            else
            {
                return {ok:false, msg:"`DFAILED - K3Y DOES NOT EXIST`"}
            }
        }

                // K3Y STASHER
        if (args.stash)
        {
            #ms.sys.manage({unload:0})
            #ls.sys.xfer_upgrade_to({to:_stashUser,i:_k3yList.map(a=>a.i)})
            return {ok:true, msg:"`LK3ys sent to stash!`\n"}
        }

                // K3Y SURPLUS STASHER
        if (args.surplus)
        {
            #ls.sys.xfer_upgrade_to({i:_surplus, to:_stashUser})
            return "\n\n`LK3Y COUNT:`\n" + JSON.stringify(_surplusCount).split(',').join('\n ') + "\n\n`DSURPLUS INDEXES:`\n" + JSON.stringify(_surplus)
        }
    }
    else
    {
        return {ok:false, msg:"`DINCORRECT USER`"}
    }
}