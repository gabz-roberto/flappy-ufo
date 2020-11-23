function createElement(tagName, className) {
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}

function Tube(reverse = false) {
    this.element = createElement('div', 'tube')

    const edge = createElement('div', 'edge')
    const body = createElement('div', 'body')

    this.element.appendChild(reverse ? body : edge)
    this.element.appendChild(reverse ? edge : body)

    this.setHeight = height => body.style.height = `${height}px`
}

function pairOfTubes(height, gap, x) {
    this. element = createElement('div', 'pair-of-tubes')

    this.higher = new Tube(true)
    this.bottom = new Tube(false)

    this.element.appendChild(this.higher.element)
    this.element.appendChild(this.bottom.element)

    this.drawGap = () => {
        const topHeight = Math.random() * (height - gap)
        const bottomHeight = height - gap - topHeight

        this.higher.setHeight(topHeight)
        this.bottom.setHeight(bottomHeight)
    }

    this.getX = () => parseInt(this.element.style.left.split('px')[0])
    this.setX = x => this.element.style.left = `${x}px`

    this.getWidth = () => this.element.clientWidth
    this.drawGap()
    this.setX(x)
}

function Tubes(height, width, gap, space, notifyPoint) {
    this.pairs = [
        new pairOfTubes(height, gap, width),
        new pairOfTubes(height, gap, width + space),
        new pairOfTubes(height, gap, width + space * 2),
        new pairOfTubes(height, gap, width + space * 3)
    ]

    const displacement = 3
    this.animate = () => {
        this.pairs.forEach(pair => {
            pair.setX(pair.getX() - displacement)

            if(pair.getX() < -pair.getWidth()) {
                pair.setX(pair.getX() + space * this.pairs.length)
                pair.drawGap()
            }

            const middle = width / 2
            const crossMiddle = pair.getX() + displacement >= middle
                && pair.getX() < middle
                if(crossMiddle) notifyPoint()
        })
    }
}

function UFO(gameHeight) {
    let flying = false

    this.element = createElement('img', 'ufo')
    this.element.src = 'imgs/ufo.png'

    this.getY = () => parseInt(this.element.style.bottom.split('px')[0])
    this.setY = y => this.element.style.bottom = `${y}px`

    window.onkeydown = event => flying = true
    window.onkeyup = event => flying = false

    this.animate = () => {
        const newY = this.getY() + (flying ? 8 : -5)

        const maxHeight = gameHeight - this.element.clientHeight

        if(newY <= 0) {
            this.setY(0)
        } else if (newY >= maxHeight) {
            this.setY(maxHeight)
        } else {
            this.setY(newY)
        }
    }
    this.setY(gameHeight / 2)
}

function Score() {
    this.element = createElement('span', 'score')
    this.updateScore = score => {
        this.element.innerHTML = score
    }
    this.updateScore(0)
}

function areOverlapping(elementA, elementB) {
    const a = elementoA.getBoundingClientRect()
    const b = elementoB.getBoundingClientRect()


    const horizontal = a.left + a.width >= b.left
        && b.left + b.width >= a.left

    const vertical = a.top + a.height >= b.top
        && b.top + b.height >= a.top

    return horizontal && vertical
}