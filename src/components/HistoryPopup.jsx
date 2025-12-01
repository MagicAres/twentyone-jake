const HistoryPopup = ({
  show,
  history = [],
  paginatedHistory = [],
  historyPage,
  totalHistoryPages,
  goToPage,
  onClose
}) => {
  if (!show) return null;

  const HISTORY_PAGE_SIZE = 5;

  return (
    <div className="popup-overlay">
      <div className="popup-neon popup-neon-centered">
        <h2 className="neon-title">📜 Historique des Parties</h2>

        <button
          className="btn-close-neon"
          onClick={() => {
            onClose();
          }}
        >
          ✖
        </button>

        {history.length === 0 ? (
          <p className="text-center mt-3">Aucune partie jouée.</p>
        ) : (
          <>
            <div className="history-table-wrapper">
              <table className="table table-dark table-striped neon-table historyTable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Mise</th>
                    <th>Joueur</th>
                    <th>Score</th>
                    <th>Résultat</th>
                    <th>Solde</th>
                    <th>Hot 3</th>
                    <th>Perfect Pair</th>
                    <th>21+3</th>
                    <th>Dealer</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedHistory.map((h, idx) => (
                    <tr key={h.id}>
                      <td>{(historyPage - 1) * HISTORY_PAGE_SIZE + idx + 1}</td>
                      <td>{h.bet}</td>
                      <td className="cardsCell">
                        {(h.playerCards || []).map((c, i) => (
                          <img key={i} src={c.image} width={40} className="card-mini" alt={c.code} />
                        ))}
                      </td>
                      <td>{h.score}</td>
                      <td className={h.result === "GAGNÉ" ? "text-success" : "text-danger"}>{h.result}</td>
                      <td>{h.balanceAfter}</td>
                      <td className="text-center">{h.sideBets?.hot3 ? "✅" : ""}</td>
                      <td className="text-center">{h.sideBets?.perfectPair ? "✅" : ""}</td>
                      <td className="text-center">{h.sideBets?.twentyOnePlusThree ? "✅" : ""}</td>
                      <td className="cardsCell">
                        {(h.dealerCards || []).map((c, i) => (
                          <img key={i} src={c.image} width={40} className="card-mini" alt={c.code} />
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="history-pagination">
              <button className="page-btn" onClick={() => goToPage(historyPage - 1)} disabled={historyPage === 1}>Préc</button>

              {Array.from({ length: totalHistoryPages }).map((_, i) => {
                const p = i + 1;
                const isActive = p === historyPage;
                if (totalHistoryPages > 7) {
                  if (p !== 1 && p !== totalHistoryPages && Math.abs(p - historyPage) > 2) {
                    if (p === 2 && historyPage > 4) return <span key={p} className="dots">…</span>;
                    if (p === totalHistoryPages - 1 && historyPage < totalHistoryPages - 3) return <span key={p} className="dots">…</span>;
                    if (p !== 1 && p !== totalHistoryPages) return null;
                  }
                }
                return (
                  <button
                    key={p}
                    className={`page-btn ${isActive ? "active" : ""}`}
                    onClick={() => goToPage(p)}
                  >
                    {p}
                  </button>
                );
              })}

              <button className="page-btn" onClick={() => goToPage(historyPage + 1)} disabled={historyPage === totalHistoryPages}>Suiv</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HistoryPopup;
