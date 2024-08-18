using System;
using System.Collections.Generic;

namespace LoginService.Models;

public partial class User
{
    public int Uid { get; set; }

    public string? Username { get; set; } = null!;

    public string Pwd { get; set; }= null!;

    public int? Rid { get; set; }

    public sbyte? Status { get; set; }

    public virtual ICollection<Farmer>? Farmers { get; set; } = new List<Farmer>();

    public virtual Role? RidNavigation { get; set; } = null;

    public virtual ICollection<Wholesaler>? Wholesalers { get; set; } = new List<Wholesaler>();
}
