class Player < ActiveRecord::Base
  has_many :racers
  has_many :games, through: :racers
  validates :username, uniqueness: true
end
