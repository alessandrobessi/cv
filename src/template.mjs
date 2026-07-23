function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderLinks(links = []) {
  return links
    .map(
      (link) =>
        `<a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}</a>`
    )
    .join('<span class="sep">·</span>');
}

function renderContact(basics) {
  const parts = [];
  if (basics.location) parts.push(escapeHtml(basics.location));
  if (basics.email)
    parts.push(`<a href="mailto:${escapeHtml(basics.email)}">${escapeHtml(basics.email)}</a>`);
  if (basics.phone) parts.push(escapeHtml(basics.phone));
  if (basics.website)
    parts.push(`<a href="${escapeHtml(basics.website)}">${escapeHtml(basics.website)}</a>`);
  return parts.join('<span class="sep">·</span>');
}

function renderDateRange(startDate, endDate) {
  if (startDate && endDate) return `${escapeHtml(startDate)} – ${escapeHtml(endDate)}`;
  return escapeHtml(startDate || endDate || '');
}

function renderExperience(experience = []) {
  return experience
    .map(
      (job) => `
    <div class="entry">
      <div class="entry-header">
        <span class="entry-title">${escapeHtml(job.role)} · ${escapeHtml(job.company)}</span>
        <span class="entry-dates">${renderDateRange(job.startDate, job.endDate)}</span>
      </div>
      <div class="entry-subtitle">${escapeHtml(job.location)}</div>
      <ul>
        ${(job.highlights || [])
          .map((highlight) => `<li>${escapeHtml(highlight)}</li>`)
          .join('\n        ')}
      </ul>
    </div>`
    )
    .join('\n');
}

function renderEducation(education = []) {
  return education
    .map(
      (edu) => `
    <div class="entry">
      <div class="entry-header">
        <span class="entry-title">${escapeHtml(edu.degree)}, ${escapeHtml(edu.field)}</span>
        <span class="entry-dates">${renderDateRange(edu.startDate, edu.endDate)}</span>
      </div>
      <div class="entry-subtitle">${escapeHtml(edu.institution)} · ${escapeHtml(edu.location)}</div>
      ${edu.details ? `<p>${escapeHtml(edu.details)}</p>` : ''}
    </div>`
    )
    .join('\n');
}

function renderSkills(skills = []) {
  return skills
    .map(
      (group) => `
    <div class="skill-group">
      <span class="skill-category">${escapeHtml(group.category)}:</span>
      <span class="skill-items">${(group.items || []).map(escapeHtml).join(', ')}</span>
    </div>`
    )
    .join('\n');
}

function renderProjects(projects = []) {
  return projects
    .map(
      (project) => `
    <div class="entry">
      <div class="entry-header">
        <span class="entry-title">
          ${project.url ? `<a href="${escapeHtml(project.url)}">${escapeHtml(project.name)}</a>` : escapeHtml(project.name)}
        </span>
      </div>
      <p>${escapeHtml(project.description)}</p>
      ${project.tech ? `<div class="entry-subtitle">${project.tech.map(escapeHtml).join(', ')}</div>` : ''}
    </div>`
    )
    .join('\n');
}

function renderBooks(books = []) {
  return books
    .map(
      (book) => `
    <div class="entry">
      <div class="entry-header">
        <span class="entry-title">
          ${book.url ? `<a href="${escapeHtml(book.url)}">${escapeHtml(book.title)}</a>` : escapeHtml(book.title)}
        </span>
        ${book.year ? `<span class="entry-dates">${escapeHtml(book.year)}</span>` : ''}
      </div>
      ${book.description ? `<p>${escapeHtml(book.description)}</p>` : ''}
    </div>`
    )
    .join('\n');
}

export function renderResume(data) {
  const { basics, summary, experience, education, skills, projects, books } = data;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(basics.name)} — ${escapeHtml(basics.title)}</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <main class="resume">
    <header class="header">
      <h1>${escapeHtml(basics.name)}</h1>
      <p class="title">${escapeHtml(basics.title)}</p>
      <p class="contact">${renderContact(basics)}</p>
      ${basics.links ? `<p class="contact links">${renderLinks(basics.links)}</p>` : ''}
      <a class="download-pdf no-print" href="cv.pdf">Download PDF</a>
    </header>

    ${summary ? `<section>
      <h2>Summary</h2>
      <p>${escapeHtml(summary.trim())}</p>
    </section>` : ''}

    ${skills?.length ? `<section>
      <h2>Skills</h2>
      ${renderSkills(skills)}
    </section>` : ''}

    ${experience?.length ? `<section>
      <h2>Experience</h2>
      ${renderExperience(experience)}
    </section>` : ''}

    ${projects?.length ? `<section>
      <h2>Projects</h2>
      ${renderProjects(projects)}
    </section>` : ''}

    ${books?.length ? `<section>
      <h2>Technical Writing &amp; Books</h2>
      ${renderBooks(books)}
    </section>` : ''}

    ${education?.length ? `<section>
      <h2>Education</h2>
      ${renderEducation(education)}
    </section>` : ''}
  </main>
</body>
</html>
`;
}
