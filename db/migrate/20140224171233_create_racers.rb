class CreateRacers < ActiveRecord::Migration
  def change
    create_table :racers do |t|
      t.belongs_to :game
      t.belongs_to :player
    end
  end
end
