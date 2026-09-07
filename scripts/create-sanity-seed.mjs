import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import vm from "node:vm";

const rootDir = process.cwd();
const sourceFile = path.join(rootDir, "data", "site-architecture.ts");
const outputFile = path.join(
  rootDir,
  ".sanity-seed",
  "seed-documents.json",
);

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "und")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ref(id) {
  return {
    _type: "reference",
    _ref: id,
  };
}

function readSiteData() {
  const source = fs.readFileSync(sourceFile, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  }).outputText;

  const sandbox = {
    exports: {},
    require: () => {
      throw new Error("Unexpected require while reading site data");
    },
  };
  sandbox.module = { exports: sandbox.exports };

  vm.runInNewContext(transpiled, sandbox, { filename: sourceFile });
  return sandbox.module.exports;
}

const { companies, references, teamMembers } = readSiteData();
const docs = [];

Object.entries(companies).forEach(([slug, company], index) => {
  docs.push({
    _id: `company.${slug}`,
    _type: "company",
    title: company.title,
    slug: { _type: "slug", current: slug },
    isVisible: true,
    sortOrder: index + 1,
  });
});

const categoryKeys = new Map();
references.forEach((entry) => {
  if (!entry.categorySlug || !entry.categoryTitle) return;
  const id = `referenceCategory.${entry.company}.${entry.categorySlug}`;
  if (categoryKeys.has(id)) return;
  categoryKeys.set(id, true);
  docs.push({
    _id: id,
    _type: "referenceCategory",
    title: entry.categoryTitle,
    slug: { _type: "slug", current: entry.categorySlug },
    company: ref(`company.${entry.company}`),
    isVisible: true,
    sortOrder: categoryKeys.size,
  });
});

const departmentKeys = new Map();
teamMembers.forEach((member) => {
  const id = `teamDepartment.${member.company}.${member.departmentSlug}`;
  if (departmentKeys.has(id)) return;
  departmentKeys.set(id, true);
  docs.push({
    _id: id,
    _type: "teamDepartment",
    title: member.departmentTitle,
    slug: { _type: "slug", current: member.departmentSlug },
    company: ref(`company.${member.company}`),
    isVisible: true,
    sortOrder: departmentKeys.size,
  });
});

teamMembers.forEach((member, index) => {
  docs.push({
    _id: `teamMember.${member.company}.${member.slug}`,
    _type: "teamMember",
    name: member.name,
    role: member.role,
    company: ref(`company.${member.company}`),
    department: ref(`teamDepartment.${member.company}.${member.departmentSlug}`),
    imageAlt: `${member.name}, ${member.role}`,
    legacyImagePath: member.imageSrc,
    isVisible: true,
    sortOrder: index + 1,
  });
});

references.forEach((entry, index) => {
  const cover = entry.images[0];
  docs.push({
    _id: `projectReference.${entry.company}.${entry.slug}`,
    _type: "projectReference",
    title: entry.title,
    slug: { _type: "slug", current: entry.slug },
    company: ref(`company.${entry.company}`),
    category: entry.categorySlug
      ? ref(`referenceCategory.${entry.company}.${entry.categorySlug}`)
      : undefined,
    location: entry.title.includes(",") ? entry.title.split(",").slice(1).join(",").trim() : undefined,
    clientType: undefined,
    description: entry.description,
    coverImageAlt: cover?.alt,
    legacyCoverImagePath: cover?.src,
    legacyGalleryImagePaths: entry.images.slice(1).map((image) => ({
      _type: "object",
      _key: slugify(image.src),
      src: image.src,
      alt: image.alt,
    })),
    isFeatured: index < 12,
    isVisible: true,
    sortOrder: index + 1,
  });
});

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(docs, null, 2));
console.log(`Wrote ${docs.length} Sanity seed documents to ${outputFile}`);
