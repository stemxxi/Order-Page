const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 500,
        amount: 0,
        get Sum() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 600,
        amount: 0,
        get Sum() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    },
    freshCombo: {
        name: 'Fresh Combo',
        price: 31900,
        kcall: 800,
        amount: 0,
        get Sum() {
            return this.price * this.amount;
        },
        get Kcall() {
            return this.kcall * this.amount;
        }
    }
}

const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 1000,
        kcall: 400
    },
    lettuce: {
        name: 'Салатный лист',
        price: 500,
        kcall: 200
    },
    cheese: {
        name: 'Сыр',
        price: 700,
        kcall: 150
    }
}

const btnPlusOrMinus = document.querySelectorAll('.main__product-btn')

for (let element of btnPlusOrMinus) {
    // console.log(element);

    element.addEventListener('click', function() {
        plusOrMInus(this)
    })
}

function plusOrMInus(element) {
    //closest()- метод объекта подключается к родительскому элементу
    //getAttribute() - получает атрибут у элемента
    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        productAmount = parent.querySelector('.main__product-num'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        elementData = element.getAttribute('data-symbol');

    if (elementData == '+') {
        product[parentId].amount++
    } else if (elementData == '-' && product[parentId].amount > 0) {
        product[parentId].amount--
    }
    productAmount.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].Sum;
    kcall.innerHTML = product[parentId].Kcall
}

const checkExtraProduct = document.querySelectorAll('.main__product-checkbox')

for (let i = 0; i < checkExtraProduct.length; i++) {
    checkExtraProduct[i].addEventListener('click', function() {
        addExtraProduct(this)
    })
}

function addExtraProduct(element) {
    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        kcall = parent.querySelector('.main__product-kcall span'),
        price = parent.querySelector('.main__product-price span'),
        elAttribute = element.getAttribute('data-extra');

    product[parentId][elAttribute] = element.checked;

    if (product[parentId][elAttribute] == true) {
        product[parentId].price += extraProduct[elAttribute].price;
        product[parentId].kcall += extraProduct[elAttribute].kcall;
    } else {
        product[parentId].price -= extraProduct[elAttribute].price;
        product[parentId].kcall -= extraProduct[elAttribute].kcall;
    }
    price.innerHTML = product[parentId].Sum
    kcall.innerHTML = product[parentId].Kcall
}

const addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptOut = document.querySelector('.receipt__window-out'),
    receiptWindow = document.querySelector('.receipt__window'),
    receiptBtn = document.querySelector('.receipt__window-btn');
let arrProduct = [],
    totalPrice = 0,
    totalKcall = 0,
    totalName = '';

addCart.addEventListener('click', function() {
    receipt.classList.remove('active');
    receipt.style.display = 'flex';
    receipt.style.opacity = 1;
    for (const key in product) {
        if (product[key].amount > 0) {
            arrProduct.push(product[key])
            for (const newKey in product[key]) {
                if (product[key][newKey] === true) {
                    product[key].name += '\n' + extraProduct[newKey].name;
                }
            }
        }
        product[key].price = product[key].Sum
        product[key].kcall = product[key].kcall
    }

    for (let value of arrProduct) {
        let el = value;
        totalPrice += el.price;
        totalKcall += el.kcall;
        totalName += '\n' + el.name + '\n';
    }

    receiptOut.innerHTML = `Вы купили: \n ${totalName} \n Каллорийность ${totalKcall} \n Стоимость ${totalPrice} сум`

    receiptWindow.style.cssText = `
    display:flex;
    flex-direction:column;
    align-items:center;
    background:#FFFFFF;
    padding:100px
    `
    document.body.style.overflow = 'hidden';

})

receiptBtn.addEventListener('click', () => {
    if (totalPrice == 0) {
        alert('Вы ничего не выбрали')
    } else {
        location.reload();
    }
})

//keycode.info


// document.addEventListener('keydown', (e) =>{
//     if(e.which == 27){

//         receipt.classList.add('active')
//         receipt.style.display = 'none';
//         receipt.style.opacity = '0';
//         document.body.style.overflow = '';
//
//     }
// })

receipt.addEventListener('click', (e) => {
    if (e.target === receipt) {
        receipt.classList.add('active')
        receipt.style.display = 'none';
        receipt.style.opacity = '0';
        document.body.style.overflow = '';
        location.reload();
    }
})

/***********увеличение картинки при клике и добавление аттрибутов одного объекта другому*******/
const productInfo = document.querySelectorAll('.main__product-info'),
    view = document.querySelector('.view'),
    mainProductImg = document.querySelectorAll('.main__product-info img'),
    viewImg = document.querySelector('.view img'),
    closeBtn = document.querySelector('.view__close')


for (let i = 0; i < productInfo.length; i++) {
    productInfo[i].addEventListener('dblclick', function() {
        let a = mainProductImg[i].getAttribute('src')
        viewImg.src = a
        view.classList.add('active')
    })
}
closeBtn.addEventListener('click', function() {
    view.classList.remove('active')
})