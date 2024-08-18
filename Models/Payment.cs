using System;
using System.Collections.Generic;

namespace LoginService.Models;

public partial class Payment
{
    public int Payid { get; set; }

    public DateTime Paydate { get; set; }

    public string Paytype { get; set; } = null!;

    public float Amount { get; set; }

    public int TransactionId { get; set; }

    public int Oid { get; set; }

    public int Wid { get; set; }

    public virtual Order OidNavigation { get; set; } = null!;

    public virtual Wholesaler WidNavigation { get; set; } = null!;
}
