let letters = "abcdefg".split(""),
startDate = +new Date(),
guesses = [],
count = 0
while (count++ <1e5)
{
  guess = shuffle(letters).join("")
  if (guesses.indexOf(guess) == -1)
  {
    guesses.push(guess)
  }
}

console.log(guesses.length) // comes to 1*2*3*...*n

function shuffle(a) {
    let t = [], b = [...a]
    while(b.length>0)
    {
      t.push(b.splice(Math.floor(Math.random()*b.length),1))
    }
    return t;
}