var a = 1
var b = a++
var c = ++a
undefined
a
3
b
1
c
3
var d = 'hello'
undefined
var e = false
undefined
d++
NaN
e++
0
var perplexed
undefined
perplexed +2
NaN
var price = 2.7
undefined
price.tofixed(2.7)

price.toFixed(2.7)
'2.70'
var price = '2.7'
undefined
price.toFixed(20)
price.toFixed(2)
price.toFixed(2)
isNaN(0)
false
isNan(1)
isNaN(1)
false
isNaN('0')
false
isNaN("")
false
isNaN('string')
true
isNaN('1')
false
isNaN('3.145')
false
isNaN(Number.MAX_VALUE)
false
isNaN(Infinity)
false
isNaN('true')
true
isNaN(true)
false
isNaN('false')
true
isNaN(false)
false
NaN === NaN
false
!true
false
!false
true
!!true
true
!!false
false
!!0
false
!!-0
false
!!1
true
!!-1
true
!!0.1
true
!!'hello'
true
!!""
false
!!''
false
!!'false'
true
!!'0'
true
var sample = 'Hello Codeup';
undefined
sample.length
12
sample.toUpperCase()
'HELLO CODEUP'
sample= sample.toUpperCase()
'HELLO CODEUP'
sample
'HELLO CODEUP'
sample = sample + ' Students'
'HELLO CODEUP Students'
sample = sample.replace('Students','CLASS')
'HELLO CODEUP CLASS'
sample.indexOf('C')
6
sample.substring(6,12)
'CODEUP'
var mermaid = 3
undefined
var bear = 5
undefined
var herc = 1
undefined
var money = (mermaid + bear + herc) * 3
undefined
money
27
var payPerHourGoogle = 400, payPerHourAmazon = 380, payPerHourFacebook = 350, workHoursGoogle = 6, workHourAmazon = 4, workHoursFacebook = 10
undefined
var payForWorkWeek = (payPerHourGoogle * workHoursGoogle) + (payPerHourAmazon * workHourAmazon) + (payPerHourFacebook * workHoursFacebook)
undefined
payForWorkWeek
7420
var isClassFull = true, isConflict= false
undefined
var canEnroll= isClassFull && isConflict
undefined
canEnroll
false
var isNumberOfItemsTwo = true, offerHasNotExpired = true, isPremiumMember = false
undefined
var canRecieveOffer = (isNumberOfItemsTwo || isPremiumMember) && offerHasNotExpired
undefined
canRecieveOffer
true
var passwordLength = true, isNotUsername = true, usernameLength = true, noSpaces = true
undefined
var validSignIn = passwordLength && isNotUsername && usernameLength && noSpaces
undefined
validSignIn
true