using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.WhatTempl;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class WhatTempController : BaseApiController
    {
        private readonly DataContext _context;

        public WhatTempController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<WhatTemp>>> GetTemplates()
        {


            return HandleResult(await Mediator.Send(new List.Query()));


        }


        [HttpGet("{id}")]
        public async Task<ActionResult<WhatTemp>> GetTemplate(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { id = id }));

        }



        [HttpPut("{id}")]
        public async Task<IActionResult> PutTemplate(Guid id, WhatTemp temp)
        {
            temp.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { whatTemp = temp }));

        }



        [HttpPost]
        public async Task<ActionResult<WhatTemp>> PostTemplate(WhatTemp temp)
        {
            return HandleResult(await Mediator.Send(new Create.Command { whatTemp = temp }));

        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<WhatTemp>> DeleteTemplate(Guid id)
        {

            return HandleResult(await Mediator.Send(new Delete.Command { id = id }));

        }
    }
}
