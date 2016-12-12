$prepare_script = <<SCRIPT
# Install Docker
curl -sSL https://get.docker.com/ | sh
SCRIPT

Vagrant.configure(2) do |config|
  config.vm.define "host-00" do |config|
    config.vm.box = "ubuntu/trusty64"
    config.vm.hostname = "host-00"
    config.vm.network "private_network", ip: "10.0.7.11"
    config.vm.provision "shell", inline: $prepare_script
    config.vm.synced_folder "../", "/vagrant"

    config.vm.provider "virtualbox" do |v|
      v.memory = 1024
      v.cpus = 2
    end
  end
end