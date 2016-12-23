# groep-1
## Uitleg
Dit is een twitter sentiment analyser. Het analyseert de gevoelswaarde die komt kijken bij een tweet en zal dit realtime toepassen.
Denk maar aan bvb. het gevoel dat komt kijken bij keywords zoals **Christmas** of **Dead** 
Aan de hand van de grafiek en emoticons kan men eenvoudig zien welke primerende gevoelswaarde deze tweets hebben.

### Keyword aanpassen
Men kan eenvoudig het keyword aanpassen door op het default keyword *christmas* te klikken en hiervan de waarde aan te passen (invoervak)

### Stream pauseren
Men kan de stream pauseren a.d.h.v. de **Spatiebar**, deze zal de stream pauseren of hervatten.

## Installatie
Hoe installeren? eenvoudig, volg gewoon de onderstaande stappen!

1. Clone repository: `https://github.ugent.be/gdtProject2016/groep-1`
2. Run services: `docker-compose up`
3. Open [http://localhost:3000/](http://localhost:3000/)

of manueel:

1. `docker build -t groep-1-app https://github.ugent.be/gdtProject2016/groep-1.git#:application`
2. `docker run -p 3000:3000 -it --rm --name groep-1-running-app groep-1-app`

voor de tests:

1. `docker build -t groep-1-test https://github.ugent.be/gdtProject2016/groep-26.git#:test`
2. `docker run -it --rm --name groep-1-running-test groep-1-test`

## OPGELET!!
Hyper-V gaat in sleep mode na dat de computer in sleep mode gaat. Na het hervatten zal de datum niet meer synchroon lopen met de computer.
Indien dit gebeurt moet de computer heropgestart worden! anders zal de twitter API niet werken.

## Contributors
- [Maxim Geerinck](mailto:maxim.geerinck@ugent.be)
- [Xavier Geerinck](mailto:xavier.geerinck@ugent.be)