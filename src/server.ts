import fastify from "fastify";
import { movies, streamers } from "./data/data";
import cors from "@fastify/cors"

const app = fastify()

// definindo o CORS da app
 app.register(cors, {
  origin: "*"
})

app.get('/movies', (request, reply) => {
  reply.type('application/json').code(200)
  return {
    message: 'List Movies',
    movies: movies
  }
})

app.get('/streamers', (request, reply) => {
  reply.type('application/json').code(200)
  return {
    message: 'List Streamers',
    streamers: streamers
  }
})

interface ReplyStreamerModel {
  name: string
}

app.get<{ Params: ReplyStreamerModel }>('/movies/streamers/:name', (request, reply) => {
  const streamer = request.params.name
  // let filmesPorStreamer = []
  const filteredMovies = movies.filter(
    movie => movie.ondeAssistir.toLowerCase() === streamer.toLowerCase()
  )
  return filteredMovies
})

app.listen({
  port: 3000
}).then(()=> console.log('server init'))

