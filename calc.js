/*
 * Implement all your JavaScript in this file!
 */

const stack = []

function update_screen() {
    if (stack[stack.length - 1]?.type === 'operand') {
        $('#display').val(stack[stack.length - 1]?.value)
      }
    else if (stack[stack.length - 1]?.type === 'operator' &&
    stack[stack.length - 2]?.type === 'operand') {
        $('#display').val(stack[stack.length - 2]?.value)
    }
}

function reset() {
    stack.length = 0
    stack.push({
      type: 'operand',
      value: '',
    })
  }

function insert_operator(sign) {
    if (stack[stack.length - 1]?.type === 'operator') {
        stack[stack.length - 1] = {
            type: 'operator',
            value: sign
        }
    } else {
        stack.push({
            type: 'operator',
            value: sign
        })
    }
}

function check_prev() {
    if (stack.length > 3) {
        if (
            stack[stack.length - 2]?.type === 'operand' &&
            stack[stack.length - 3]?.type === 'operator' &&
            stack[stack.length - 3].value != '=' &&
            stack[stack.length - 4]?.type === 'operand'
        ) {
            const operand1 = Number(stack[stack.length - 4].value)
            const operator = stack[stack.length - 3].value
            const operand2 = Number(stack[stack.length - 2].value)
            const next_operator = stack[stack.length - 1].value
            reset()
            stack.push({
                type: 'operand',
                value: operatorMap[operator](operand1, operand2)})
            stack.push({
                type: 'operator',
                value: next_operator
            })
            update_screen()
        }
    }
}
const operatorMap = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '/': (a, b) => a / b,
    '*': (a, b) => a * b,
  }

function insert_operand(number) {
    if (stack[stack.length - 1]?.type === 'operand') {
        stack[stack.length - 1].value += number
    } else {
        stack.push({
            type: 'operand',
            value: Number(number)
        })
    }
}

$(function() {
    $('button#addButton').on('click', function () {
        insert_operator('+')
        check_prev()
        update_screen()
    })
    $('button#subtractButton').on('click', function () {
        insert_operator('-')
        check_prev()
        update_screen()
    })
    $('button#multiplyButton').on('click', function () {
        insert_operator('*')
        check_prev()
        update_screen()
    })
    $('button#divideButton').on('click', function () {
        insert_operator('/')
        check_prev()
        update_screen()
    })
    $('button[value]').on('click', function () {
        insert_operand(this.value)
        update_screen()

    })
    $('button#clearButton').on('click', function () {
        reset()
        update_screen()
    })
    $('button#equalsButton').on('click', function () {
        if (
            stack[stack.length - 1]?.type === 'operand' &&
            stack[stack.length - 2].value == '='
        ) {
            stack.push({
                type: 'operator',
                value: stack[stack.length - 4].value
            })
            stack.push({
                type: 'operand',
                value: Number(stack[stack.length - 4].value)
            })
        }
        if (
            stack[stack.length - 1]?.type === 'operand' &&
            stack[stack.length - 2]?.type === 'operator' &&
            stack[stack.length - 3]?.type === 'operand'
        ) {
            const operand1 = Number(stack[stack.length - 3].value)
            const operator = stack[stack.length - 2].value
            const operand2 = Number(stack[stack.length - 1].value)
            insert_operator('=')
            stack.push({
                type: 'operand',
                value: operatorMap[operator](operand1, operand2),
            })
            update_screen()
        }
      })
})