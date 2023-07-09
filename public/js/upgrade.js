document.getElementById("upgrade_id").addEventListener("change", function () {
  const selectedUpgradeId = this.value
  const inv_id = (document.getElementById("hidden_inv_id")).value
  window.location.href = `/inv/upgrade/${selectedUpgradeId}/${inv_id}`
})
