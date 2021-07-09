
import { PrismaClient } from '@prisma/client'
import { extendType, idArg, nonNull, objectType, queryType, stringArg } from 'nexus'

export const Todo = objectType({
    name: "Todo",
    definition(t) {
        t.id('id')
        t.string('title')
        t.string('description')
        t.boolean("done")
    },
})

export const TodoNotDone = extendType({
    type: "Todo",
    definition(t) {
        t.nonNull.list.field('notdone', {
            type: 'Todo',
            resolve(_root, _args, { db }) {
                db
                return []
            }

        })
    },
})

export const TodoQuery = extendType({
    type: "Query",
    definition(t) {
        t.list.field('notdone', {
            type: 'Todo',
            resolve(_root, _args, { db }) {
                // const db = (ctx.db as PrismaClient)
                return db.todo.findMany({ where: { done: false } })
            }
        })
        t.list.field('todos', {
            type: 'Todo',
            resolve(_root, _args, { db }) {
                // const db = (ctx.db as PrismaClient)
                return db.todo.findMany()
            }
        })
    }
})

export const TodoUpdateResponse = objectType({
    name: 'TodoUpdateResponse',
    definition(t) {
        t.boolean('success')
        t.string('message')

    },
})


export const TodoMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createTodo', {
            type: 'Todo',
            args: {
                title: nonNull(stringArg()),
                description: nonNull(stringArg()),
            },
            resolve(_root, args, ctx) {
                const todo = {
                    title: args.title,
                    description: args.description,
                    done: false,
                }
                return ctx.db.todo.create({
                    data: todo
                })
            },
        })
        t.field('deleteTodo', {
            type: 'TodoUpdateResponse',
            args: {
                id: nonNull(idArg())
            },
            async resolve(_root, args, ctx) {
                try {
                    await ctx.db.todo.delete({
                        where: {
                            id: parseInt(args.id)
                        }
                    })
                    return {
                        success: true,
                        message: "ok"
                    }
                } catch (error) {
                    return {
                        success: false,
                        message: "key error in deleteTodo() call"
                    }
                }

            },
        })
    }
})