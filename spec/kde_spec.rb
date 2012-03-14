require File.expand_path(File.dirname(__FILE__) + '/spec_helper')
require 'yaml'

describe "Kde" do
  before :each do 
    @arr = YAML::load_file(File.join(TESTFILES, "arr.yml"))
  end
  describe 'IO' do 
    it "takes Array" do
      Stats::KDE
    end
  end
  describe 'Bandwidthing' do 
    it 'has #bandwidth method'
    it 'can bandwidth appropriately'
    1
  end
  it 'has #generate method'
end
