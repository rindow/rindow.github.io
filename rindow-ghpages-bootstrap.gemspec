# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "rindow-ghpages-bootstrap"
  spec.version       = "0.2.0"
  spec.authors       = ["Yuichi Ishikawa"]
  spec.email         = ["yuichiis.pub@gmail.com"]

  spec.summary       = %q{A beautiful, githubpages theme for Jekyll.}
  spec.homepage      = "https://github.com/rindow/rindow-ghpages-bootstrap"
  spec.license       = "BSD 3-Clause"

  spec.metadata["plugin_type"] = "theme"

  spec.files         = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^(assets|_(includes|layouts|sass|data)/|(LICENSE|README)((\.(txt|md|markdown|html|yml|xml)|$)))}i)
  end

  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }

  spec.add_runtime_dependency "jekyll", "> 3.5"
  spec.add_runtime_dependency "jekyll-paginate", ">= 1.1"

  spec.add_development_dependency "bundler", "> 1.12"
end
