using System;
using System.Collections.Generic;

namespace LoginService.Models;

public partial class City
{
    public int Cityid { get; set; }

    public string Cityname { get; set; } = null!;

    public virtual ICollection<Farmer>? Farmers { get; set; } = new List<Farmer>();

    public virtual ICollection<Wholesaler>? Wholesalers { get; set; } = new List<Wholesaler>();
}
