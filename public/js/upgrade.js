document.getElementById("upgrade_id").addEventListener("change", function () {
  const selectedUpgradeId = this.value
  window.location.href = "/inv/upgrade/" + selectedUpgradeId
})
