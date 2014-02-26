get '/board' do
  # game = Game.find_or_create_by
  # racer = Racer.find_or_create_by
  # p session
  erb :board
end

get '/view_stats/:id' do
  @game = Game.find(params[:id])
  if request.xhr?
    erb :view_stats, layout: false
  end
end

post '/board' do
  game = Game.create(winner: params[:winner],
              elapsed_time: params[:elapsed_time])
  game.racers.create(player_id: session[:player_one])
  game.racers.create(player_id: session[:player_two])

  if request.xhr?
    (game.id).to_json
  end
end

