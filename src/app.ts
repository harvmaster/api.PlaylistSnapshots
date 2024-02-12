import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { AddressInfo } from 'net'

import routes from './routes'

import mongoose from './services/mongoose'

import config from '../config'
import refreshPlaylists from './services/SpotifyRefreshManager'

const start = async () => {
    // Mongoose / MongoDB
    try {
        console.log('Connecting to MongoDB')
        await mongoose.connect()
        console.log('Connected to MongoDB')
    } catch (err) {
        console.error(err.message)
    }

    // ExpressJS middleware, routes, etc
    const app = express()
    app.use(cors({
        origin: '*'
    }))
    app.use(bodyParser.json())
    app.use(bodyParser.raw({ type: '*/*' }))

    app.use(routes)

    // Set port and start ExpressJS Server
    const server = app.listen(config.port)
    const address = server.address() as AddressInfo
    console.log('Starting ExpressJS server')
    console.log(`ExpressJS listening at http://${address.address}:${address.port}`)

    // Setup auto playlist refresh
    setInterval(() => {
        console.log('Refreshing playlists')
        refreshPlaylists()
    }, 1000 * 60)

}

start()