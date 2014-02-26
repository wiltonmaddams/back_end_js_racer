class Game < ActiveRecord::Base
  has_many :racers
  has_many :players, through: :racers
end
