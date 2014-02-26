get '/sign_in_player_two' do
  if request.xhr?
    erb :_player_entry_form_two, layout: false
  else
    erb :sign_in_player_two
  end
end

get '/player/sign_out' do
  session.clear

  redirect to ('/')
end

post '/sign_in_player_two' do
  player = Player.find_or_create_by(username: params[:username])
  if player
    session[:player_two] = player.id
    if session[:player_two] == session[:player_one]
      session.clear
      redirect to ('/')
    else
      @player_one = Player.find(session[:player_one])
      @player_two = Player.find(session[:player_two])
    end
  end

  if request.xhr?
    erb :board, layout: false
  else
    redirect to ('/board')
  end
end

